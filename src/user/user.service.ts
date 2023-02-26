import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/models/models';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER.name)
    private readonly userModel: Model<IUser>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.userModel({ ...createUserDto, password: hash });
    newUser.save();

    return newUser;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password);

    await user.updateOne(updateUserDto, { new: true });

    return { ...user.toJSON(), ...updateUserDto };
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: `User with id ${id} deleted`,
      user: user,
    };
  }
}
