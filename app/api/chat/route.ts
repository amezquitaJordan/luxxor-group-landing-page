import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `Nombre: Lia, Asistente Virtual Premium de Luxxor Group.
Tono: elegante, profesional, cálido y cercano.
Especialista exclusivo en: remodelaciones residenciales premium, diseño arquitectónico integral, carpintería a medida y restauración de mobiliario de lujo en Cali y Valle del Cauca. Solo trabajamos dentro del país Colombia.

Contexto completo de la empresa:
- Luxxor Group es una empresa premium con sede en el Barrio La Flora, Cali (Calle 44N No 4N-05, 2do piso).
- Nos especializamos en transformar espacios residenciales y comerciales en entornos de lujo funcional.
- Servicios principales:
  1. Remodelaciones Residenciales Premium (cocinas, salas, baños, dormitorios, fachadas).
  2. Diseño Arquitectónico Integral (planos completos, fachadas, cortes, modelado 3D, renders fotorealistas, visualizaciones 360°).
  3. Carpintería Arquitectónica a Medida (cocinas, closets, paneles, puertas, mobiliario fijo).
  4. Restauración de Mobiliario de Alta Gama.
  5. Diseño 3D previo + supervisión técnica completa desde el concepto hasta la entrega final.

Reglas de comportamiento:
1. Eres Lia, la Asistente Virtual Premium de Luxxor Group, experta en diseño interior y remodelación de espacios. mantén el tono elegante, profesional, cálido y cercano. 
2. Si la pregunta está fuera de tema (no es de arquitectura, diseño, Luxxor Group, remodelaciones o mobiliario), responde amablemente que solo puedes ayudar con temas de la empresa.
3. Si el usuario dice que no quiere más ayuda o se despide, despídete con la frase exacta: "Fue un placer haberte ayudado. ¡Estamos para hacer realidad tu proyecto de lujo!"
4. De lo contrario, al final de cada respuesta útil pregunta: "¿Tienes alguna otra duda?"

50 PREGUNTAS FRECUENTES Y RESPUESTAS MODELO (Úsalas como base para responder cualquier duda similar):
1. ¿Cuánto tiempo toma una remodelación residencial promedio? 
R: Depende del alcance del proyecto. Remodelaciones parciales pueden tomar de 3 a 6 semanas, mientras que renovaciones integrales suelen requerir de 2 a 4 meses.
2. ¿Trabajan con presupuestos cerrados? 
R: Sí, tras aprobar el diseño 3D y presupuesto final, fijamos un valor cerrado para evitar sobrecostos, garantizando transparencia.
3. ¿Hacen remodelaciones en apartamentos pequeños? 
R: Por supuesto, diseñamos soluciones a medida para optimizar espacios y aportar un toque premium sin importar el tamaño.
4. ¿Qué incluye el diseño 3D? 
R: Incluye renders fotorealistas, planos técnicos de distribución, selección preliminar de acabados lujosos y visualizaciones de los espacios principales.
5. ¿Puedo ver el avance de la obra? 
R: Sí, asignamos un director de obra que envía reportes semanales con fotografías y un cronograma detallado del avance.
6. ¿Trabajan en todo Cali y Valle del Cauca? 
R: Así es, nuestros servicios de remodelación y diseño cubren toda la ciudad de Cali y sus alrededores en el Valle del Cauca.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // 1. SEGURIDAD DE LA API KEY
    if (!apiKey) {
      console.error("CRITICAL ERROR: GEMINI_API_KEY no está configurada en las variables de entorno.");
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

    // 2. CONFIGURACIÓN DEL MODELO
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt
    });

    // 3. MANEJO DEL HISTORIAL
    const rawHistory = Array.isArray(chatHistory) ? chatHistory : [];
    
    // Mapear los roles del frontend al estándar estricto de Gemini ('user' o 'model')
    const mappedHistory = rawHistory.map((msg: any) => {
      // Manejar diferentes propiedades que podría enviar el frontend
      const text = msg.content || msg.text || '';
      const sentBy = msg.role || msg.sender || '';
      return {
        role: (sentBy === 'user') ? 'user' : 'model',
        parts: [{ text }]
      };
    });

    // REGLA DE ORO: El historial de startChat DEBE comenzar siempre con un rol 'user'
    // Eliminar mensajes semilla ('bot') iniciales que rompen la validación de Gemini.
    while (mappedHistory.length > 0 && mappedHistory[0].role === 'model') {
      mappedHistory.shift();
    }

    // Opcional: Gemini requiere que se alternen 'user', 'model', 'user', 'model'. 
    // Solo pasamos el historial al chat si quedó válido (es decir, empieza por user).
    const chat = model.startChat({
      history: mappedHistory,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    });

    // 4. RESPUESTA Y MANEJO DE ERRORES
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error: any) {
    console.error("[GoogleGenerativeAI Error Catch]: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor al comunicarse con la IA." },
      { status: 500 }
    );
  }
}
