
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCoffeeRecommendation = async (userPreference: string) => {
  if (!process.env.API_KEY) return "Dịch vụ gợi ý AI hiện không khả dụng. Vui lòng tham khảo bộ sưu tập của chúng tôi!";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là một chuyên gia pha chế (barista) chuyên nghiệp tại Gilka Coffee. Dựa trên sở thích của khách hàng này: "${userPreference}", hãy gợi ý 1-2 loại cà phê từ danh mục của chúng tôi. 
      Danh mục sản phẩm: ${JSON.stringify(PRODUCTS.filter(p => p.category === 'Coffee'))}.
      Lưu ý: Đơn vị tiền tệ là VNĐ (Ví dụ: 450.000đ).
      Hãy trả lời bằng tông giọng thân thiện, chuyên nghiệp, giải thích lý do tại sao những lựa chọn này phù hợp với khẩu vị của họ. Chỉ trả lời bằng tiếng Việt.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tôi đang gặp một chút khó khăn khi suy nghĩ. Bạn có thể thử tìm kiếm theo các nốt hương như 'trái cây' hoặc ' chocolate' không?";
  }
};
