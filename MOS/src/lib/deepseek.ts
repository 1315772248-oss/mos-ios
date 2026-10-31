import OpenAI from "openai";
import { getApiKey } from "./secure-store";

export async function createDeepSeekClient(): Promise<OpenAI> {
  const apiKey = await getApiKey();
  if (!apiKey) throw new Error("API Key 未配置，请前往设置页面填写。");

  return new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export async function chatWithDeepSeek(messages: any[]): Promise<string> {
  const client = await createDeepSeekClient();
  const response = await client.chat.completions.create({
    model: "deepseek-flash",
    messages,
    stream: false,
  });
  return response.choices[0].message.content || "";
}