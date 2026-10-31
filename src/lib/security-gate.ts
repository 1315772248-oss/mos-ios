const IRREVERSIBLE = new Set(["pay", "delete_file", "send_message", "sudo_exec"]);

export class SecurityGate {
  private hitlResolver: ((approved: boolean) => void) | null = null;

  setHitlResolver(resolver: (approved: boolean) => void) {
    this.hitlResolver = resolver;
  }

  // 新增：用于前端按钮点击时触发结果的方法
  resolveHitl(approved: boolean) {
    if (this.hitlResolver) {
      this.hitlResolver(approved);
      this.hitlResolver = null; // 触发后清空，防止重复调用
    }
  }

  async gate(action: {
    type: string;
    risk_tier?: string;
    summary?: string;
  }): Promise<boolean> {
    const isHighRisk =
      IRREVERSIBLE.has(action.type) || action.risk_tier === "critical";

    if (isHighRisk) {
      return new Promise((resolve) => {
        let timeoutId: ReturnType<typeof setTimeout>;

        this.setHitlResolver((approved) => {
          clearTimeout(timeoutId);
          resolve(approved);
        });

        // 120秒超时自动拒绝
        timeoutId = setTimeout(() => {
          if (this.hitlResolver) {
            this.hitlResolver = null;
            resolve(false);
          }
        }, 120000);
      });
    }
    return true;
  }
}

export const globalGate = new SecurityGate();