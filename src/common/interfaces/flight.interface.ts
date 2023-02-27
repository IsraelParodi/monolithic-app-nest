import { IPassenger } from "./passenger.interface"

export interface IFlight extends Document {
    pilot: string
    airplane: string
    cityDestination: string
    flightDate: Date
    passengers: IPassenger[]
}