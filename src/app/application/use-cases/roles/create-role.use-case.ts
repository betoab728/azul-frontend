import { Injectable } from '@angular/core';
import { RoleRepository } from 'src/app/domain/repositories/role.repository'; // Asegúrate de que la ruta sea correcta
import { Role } from 'src/app/domain/entities/role.entity'; // Asegúrate de que la ruta sea correcta
import { RoleMapper } from 'src/app/application/mappers/role.mapper'; // Asegúrate de que la ruta sea correcta

@Injectable({ providedIn: 'root' })

export class CreateRoleUseCase {
    constructor(private readonly roleRepository: RoleRepository) {}
  
    async execute(role: Role): Promise<Role> {   //Promise retorna una promesa de un modelo de dominio Role
        const dto = RoleMapper.toCreateDto(role); //la ui envia un modelo de dominio Role, el mapper lo convierte a un dto de creacion para la api
        const createdDto = await this.roleRepository.create(dto); //llama al repositorio para crear el rol, pasando el dto de creacion
        return RoleMapper.fromReadDto(createdDto); // convierte el dto de respuesta de la api a un modelo de dominio Role y lo retorna
    }

}

  /*el proceso es el siguiente: el caso de uso recibe de la ui un modelo de dominio Role, 
    lo convierte a un dto de creacion usando el mapper, llama al repositorio para crear el rol
     pasando el dto de creacion, y finalmente convierte el dto de respuesta de la api a un 
     modelo de dominio Role y lo retorna. Entonces recibe un modelo, lo convierte en dto, envia a la api,
     la api retorna un dto y el mapper lo convierte de nuevo a un modelo de dominio.
     */