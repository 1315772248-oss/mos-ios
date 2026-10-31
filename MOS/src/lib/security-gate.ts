const IRREVERSIBLE = new Set(["pay", "delete_file", "send_message", "sudo_exec"]);

export class SecurityGate {
  private hitlResolver: ((approved: boolean) => void) | null = null;

  setHitlResolver(resolver: (approved: boolean) => void) {
    this.hitlResolver = resolver;
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

        timeoutId = setTimeout(() => {
          this.hitlResolver = null;
          resolve(false);
        }, 120000);
      });
    }
    return true;
  }
}

export const globalGate = new SecurityGate();