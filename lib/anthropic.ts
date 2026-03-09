import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface VisionAnalysisResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function analyzeReceiptImage(
  imageBase64: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
  systemPrompt: string
): Promise<VisionAnalysisResult> {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096, // Increased to handle larger receipts
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Analyze this receipt and extract the information according to the system prompt.',
            },
          ],
        },
      ],
      system: systemPrompt,
    })

    // Check if response was truncated
    if (response.stop_reason === 'max_tokens') {
      console.error('Response truncated - hit max_tokens limit');
      return {
        success: false,
        error: 'Receipt too long. Please try uploading a smaller receipt or splitting it into multiple uploads.',
      };
    };

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      console.error('No text content in response:', response.content);
      return { success: false, error: 'No text response from Claude' };
    }

    console.log('Claude raw response:', textContent.text);

    // Parse JSON response (handle both ```json wrapped and raw JSON)
    let jsonString = textContent.text.trim();

    if (!jsonString) {
      console.error('Empty response from Claude');
      return { success: false, error: 'Empty response from Claude. Please try again.' };
    }

    // Remove markdown code fences if present
    if (jsonString.startsWith('```')) {
      // Match ```json or ``` followed by JSON content
      const jsonMatch = jsonString.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1].trim();
      } else {
        // Fallback: just remove the backticks
        jsonString = jsonString.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```$/, '').trim();
      }
    }

    console.log('JSON string after cleaning:', jsonString.substring(0, 200));

    if (!jsonString) {
      console.error('JSON string is empty after cleaning backticks');
      return { success: false, error: 'Could not extract JSON from response. Please try again.' };
    }

    const data = JSON.parse(jsonString);

    // Validate structure
    if (!data.store || !data.date || !Array.isArray(data.items)) {
      console.error('Invalid receipt structure:', data);
      return {
        success: false,
        error: 'Receipt structure invalid. Please retake photo.',
      };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Anthropic API error:', error);
    console.error('Raw response:', error.response || 'No response data');
    return {
      success: false,
      error: error.message || 'Failed to analyze receipt',
    };
  }
}
