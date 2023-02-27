import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { PASSENGER } from '../common/models/models';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name)
    private readonly passengerModel: Model<IPassenger>,
  ) { }

  async create(createPassengerDto: CreatePassengerDto): Promise<IPassenger> {
    return await this.passengerModel.create(createPassengerDto);
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.passengerModel.find();
  }

  async findOne(id: string) {
    return await this.passengerModel.findById(id);
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    const passenger = await this.findOne(id);

    await passenger.updateOne(updatePassengerDto, { new: true });

    return { ...passenger.toJSON(), ...updatePassengerDto };
  }

  async remove(id: string) {
    const user = await this.passengerModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: `User with id ${id} deleted`,
      user: user,
    };
  }
}
