import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FlightsService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger/dist/decorators';

@ApiTags("Flights")
@Controller('flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    private readonly passengerService: PassengerService
  ) { }

  @Post()
  @ApiOperation({ summary: "Create Flights" })
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassengerToFlight(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string) {
    const passenger = await this.passengerService.findOne(passengerId)

    if (!passenger) throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND)

    return this.flightsService.addPassenger(flightId, passengerId)
  }
}
