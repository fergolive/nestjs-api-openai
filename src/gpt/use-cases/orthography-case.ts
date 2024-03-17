import OpenAI from "openai"

interface Options{
    prompt:string
}

export const orthographyCheckUseCase = async(openai:OpenAI,options:Options)=>{

    const { prompt } = options

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content:
                `
                Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
                tu tarea es corregir ortograficamente el texto y devolver soluciones tal cual se especifica en el Ejemplo de salida, 
                también debes de dar un porcentaje de acierto por el usuario en la variable userScore,
                Debes de responder en formato JSON, 
                
        
                Si no hay errores, debes de retornar un mensaje de felicitaciones.
        
                Ejemplo de salida:
                {
                  userScore: number,
                  errors: string[], // ['error -> solución']
                  message: string, //  Usa emojis y texto para felicitar al usuario
                }
                
                
                `
            },
            {
                role:"assistant",
                content:prompt
            }
    
        ],
            model: "gpt-3.5-turbo",
            temperature:0.3,
            max_tokens:150,
            response_format: {
                type: 'json_object'
              }
        },
      


      );
    
      console.log(completion);
      const jsonResp=JSON.parse(completion.choices[0].message.content)
      return jsonResp;



}