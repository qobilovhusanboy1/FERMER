import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const {password, confirm_password} = createAdminDto;
    if (password !== confirm_password) throw new BadRequestException('PASSWORD IS NOT MATCH');

    const hashed_password = await bcrypt.hash(password, 7);

    //const createAdmin = await new this.adminModel({...createAdminDto, hashed_password}).save();

    const createdAdmin = await this.adminModel.create({ ...createAdminDto, hashed_password });

    const tokens = await this.getTokens(createdAdmin);
    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      createdAdmin.id,
      { hashed_token },
      { new: true }
    );
    return updateAdmin;
  }

  async findAll() {
    const admins = await this.adminModel.find();

    if (admins.length === 0) throw new BadRequestException('ADMINS NOT FOUND');

    return admins;
  }

  async findOne(id: string) {
    try {
      const admin = await this.adminModel.findById(id)
      
      return admin;
    } catch (error) {
      throw new BadRequestException('ADMIN NOT FOUND')
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, {new: true}).exec() 
    
    if(!existingAdmin) throw new NotFoundException('ADMIN NOT FOUND');

    return existingAdmin;
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }

  async getTokens(admin: AdminDocument) {
    const jwtPayload = {
      id: admin._id,
      is_creator: admin.is_creator,
      is_active: admin.is_active
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY || "MyAccessVeryVer",
        expiresIn: process.env.ACCESS_TOKEN_TIME || "15h"
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY || "MyRefreshVaryVer",
        expiresIn: process.env.REFRESH_TOKEN_TIME || "15d"
      })
    ]);
    
    return {access_token: accessToken, refresh_token: refreshToken};
  }
}