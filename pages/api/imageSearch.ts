import fetch from 'node-fetch'
import fs from 'node:fs'

const engineId = 'stable-diffusion-v1-6'
const apiHost = 'https://api.stability.ai'
const apiKey = " "

if (!apiKey) throw new Error('Missing Stability API key.')
export async function imageSearch(query: string) {
  console.log(`Searching................. ${query}`)
  try {
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: query,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      }
    )
    
    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`)
    }
    
    interface GenerationResponse {
      artifacts: Array<{
        base64: string
        seed: number
        finishReason: string
      }>
    }
    
    const responseJSON = (await response.json()) as GenerationResponse
    if (responseJSON.artifacts.length > 0 && responseJSON.artifacts[0].finishReason === "SUCCESS") {
      return responseJSON.artifacts[0].base64;
    }
    console.log(responseJSON)
    return responseJSON;
  } catch (error: any) {
    console.error('Error fetching images:', error);
    throw error;
  }
}