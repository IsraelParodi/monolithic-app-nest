import { Module } from '@nestjs/common';
import { FlightsService } from './flight.service';
import { FlightsController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { FlightSchema } from './schemas/flight.schema';
import { PassengerService } from 'src/passenger/passenger.service';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: FLIGHT.name,
    useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate'))
  }]), PassengerModule],
  controllers: [FlightsController],
  providers: [FlightsService]
})
export class FlightsModule { }
