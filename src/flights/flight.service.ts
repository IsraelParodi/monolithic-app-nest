import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightsService {

  constructor(
    @InjectModel(FLIGHT.name)
    private readonly flightModel: Model<IFlight>,
  ) { }

  async create(createFlightDto: CreateFlightDto) {
    return this.flightModel.create(createFlightDto);
  }

  async findAll() {
    return this.flightModel.find().populate('passengers');
  }

  async findOne(id: string) {
    return this.flightModel.findById(id).populate('passengers');
  }

  async update(id: string, updateFlightDto: UpdateFlightDto) {
    const flight = await this.findOne(id);

    flight.updateOne(updateFlightDto, { new: true });

    return { ...flight.toJSON(), ...updateFlightDto };
  }

  remove(id: string) {
    const flight = this.flightModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: `Flight with id ${id} deleted`,
      flight: flight,
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.flightModel.findByIdAndUpdate(flightId, { $addToSet: { passengers: passengerId } }, { new: true }).populate('passengers')
  }
}
