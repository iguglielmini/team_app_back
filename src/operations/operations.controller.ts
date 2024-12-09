import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { Operation } from './operation.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enum/role';
import { User } from 'src/users/user.entity';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  @UseGuards(RolesGuard) // Protege a rota
  @Roles(Role.Admin) // Apenas Admin pode criar
  createOperation(
    @Body() operationData: Partial<Operation>,
  ): Promise<Operation> {
    return this.operationsService.createOperation(operationData);
  }

  @Get()
  listOperations(): Promise<Operation[]> {
    return this.operationsService.listOperations();
  }

  @Get(':id')
  getOperationDetails(@Param('id') id: number): Promise<Operation> {
    return this.operationsService.getOperationDetails(id);
  }

  @Patch(':id/confirm')
  @UseGuards(RolesGuard) // Apenas usuários autenticados
  confirmParticipation(
    @Param('id') id: number,
    @Body() user: User,
  ): Promise<Operation> {
    return this.operationsService.confirmParticipation(id, user);
  }
}
