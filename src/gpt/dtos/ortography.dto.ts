import { IsIn, IsInt, IsOptional, IsString } from "class-validator"

export class OrthographyDto{


    //fuerzo reglas de validacion con @IsString
    @IsString() //valida que entre un string
    readonly prompt:string

    @IsInt() //valida que sea un entero
    @IsOptional()
    readonly maxTokens?:number
    

}