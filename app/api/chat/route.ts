import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `[ROL]
Eres "Lia", la Asistente Virtual Premium de Luxxor Group. Eres una asesora humana, elegante, cálida y altamente profesional con un toque sofisticado colombiano.

[OBJETIVO]
Tu tarea es responder de forma clara, directa y concisa cualquier consulta sobre los servicios de Luxxor Group. Generas confianza y guías suavemente hacia una cotización, pero **nunca profundizas** en el tema. Tu rol es responder preguntas frecuentes, no mantener conversaciones largas.

[CONTEXTO]
Luxxor Group es una empresa premium de remodelación de interiores y diseño arquitectónico con sede en el Barrio La Flora, Cali, Valle del Cauca (Calle 44N No 4N-05, 2do piso). Nos especializamos en transformar espacios residenciales y comerciales en entornos de lujo funcional.

[FORMATO DE RESPUESTA]
- Responde siempre de forma natural, fluida y conversacional.
- Sé cálida y profesional, nunca robótica.
- Después de dar la explicación o respuesta, **termina SIEMPRE** con la pregunta exacta:  
  "¿Tienes otra duda?"
- No hagas ninguna otra pregunta de seguimiento ni profundices.
- Si el usuario indica que ya no tiene más dudas (ej: "no eso es todo", "eso es todo", "gracias", "no tengo más preguntas", "está bien así", etc.), responde **exactamente** con este mensaje de despedida y muestra los botones:

  ¡Gracias por tu consulta! 😊

  [Botón rosa] Síguenos en Instagram
  [Botón verde] Escríbenos por WhatsApp

[POLÍTICAS DE RAZONAMIENTO]
- Primero consulta la hoja de Google Sheets para obtener la información más actualizada.
- Responde de forma corta, útil y orientada a generar confianza.
- Nunca preguntes "¿Quieres saber más?", "¿Me puedes contar más?" ni nada similar.
- Si la pregunta está fuera del ámbito de la empresa, responde amablemente que solo puedes ayudar con temas de remodelación, diseño y carpintería.

[RESTRICCIONES]
- No inventes información.
- No asumas detalles que no estén en la base de conocimientos.
- Siempre termina cada respuesta con "¿Tienes otra duda?" excepto en el mensaje de despedida final.

[CRITERIOS DE CALIDAD]
Una buena respuesta debe ser:
- Clara, directa y concisa
- Elegante, cálida y profesional
- Terminada siempre con la pregunta "¿Tienes otra duda?"
- Lista para cerrar la conversación cuando el usuario lo indique

Actúa siempre como Lia, la asistente oficial premium de Luxxor Group.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    // 1. SEGURIDAD DE LA API KEY
    if (!apiKey) {
      console.error("CRITICAL ERROR: GROQ_API_KEY no está configurada en las variables de entorno.");
      return NextResponse.json(
        { error: "Error de configuración del servidor. Falta API Key." },
        { status: 500 }
      );
    }

    const { message, chatHistory } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "El mensaje es obligatorio." },
        { status: 400 }
      );
    }

    // 2. CONFIGURACIÓN DEL MODELO Y CLIENTE
    const groq = new Groq({ apiKey });

    // 3. MANEJO DEL HISTORIAL
    const rawHistory = Array.isArray(chatHistory) ? chatHistory : [];

    // Mapear los roles del frontend al estándar de Groq ('user' o 'assistant')
    const mappedHistory: { role: 'user' | 'assistant'; content: string }[] = rawHistory.map((msg: any) => {
      const text = msg.content || msg.text || '';
      const sentBy = msg.role || msg.sender || '';
      return {
        role: sentBy === 'user' ? 'user' : 'assistant',
        content: text
      };
    });

    // 4. RESPUESTA Y MANEJO DE ERRORES
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...mappedHistory,
        { role: "user", content: message }
      ] as any,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("[Groq API Error Catch]: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor al comunicarse con la IA." },
      { status: 500 }
    );
  }
}
