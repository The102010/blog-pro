import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // تأكد من وضع مفتاح الـ API هنا
    });
  }

  async askQuestion(articleContent: string, question: string): Promise<string> {
    const prompt = `The following article:

${articleContent}

Question: ${question}

Answer:`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4', // استخدم النموذج المطلوب
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content.trim() || '';
  }
}
