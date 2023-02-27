import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateFlightDto {
    @IsNotEmpty()
    @IsString()
    readonly pilot: string

    @IsNotEmpty()
    @IsString()
    readonly airplane: string

    @IsNotEmpty()
    @IsString()
    readonly cityDestination: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly flightDate: Date
}
