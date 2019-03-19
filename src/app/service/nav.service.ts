import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {CommonService} from './common.service';
import {ToastrService} from 'ngx-toastr';
import {getAllItems, NavItem} from '../define/nav-item';

@Injectable()
export class NavService {
  public currentUrl = new BehaviorSubject<string>(undefined);

  allNavItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      route: '/main/Dashboard'
    },
    {
      displayName: 'Admin',
      route: '/main/Admin',
      children: [
        {
          displayName: 'Crear usuarios',
          route: '/main/Admin/Usuarios'
        },
        {
          displayName: 'Crear roles',
          route: '/main/Admin/Rol'
        },
        {
          displayName: 'Crear menus',
          route: '/main/Admin/Menu'
        },
        {
          displayName: 'Asignar Menus',
          route: '/main/Admin/MenuRol'
        },
      ]
    },
    {
      displayName: 'Generales',
      route: '/main/Generales',
      children: [
        {
          displayName: 'Nombre de Barrio',
          route: '/main/Generales/Barrio'
        },
        {
          displayName: 'Nombre de Circuito',
          route: '/main/Generales/Circuito'
        },
        {
          displayName: 'Nombre del Distrito',
          route: '/main/Generales/Distrito'
        },
        {
          displayName: 'Estado Civil',
          route: '/main/Generales/EstadoCivil'
        },
        {
          displayName: 'Etnia',
          route: '/main/Generales/Etnia'
        },
        {
          displayName: 'Lugar',
          route: '/main/Generales/Lugar'
        },
        {
          displayName: 'Nacionalidad',
          route: '/main/Generales/Nacionalidad'
        },
        {
          displayName: 'Ocupacion',
          route: '/main/Generales/Ocupacion'
        },
        {
          displayName: 'Nombre de la Parroquia',
          route: '/main/Generales/Parroquia'
        },
        {
          displayName: 'Nombre de la Region',
          route: '/main/Generales/Region'
        },
        {
          displayName: 'Nombre del Responsable del Scanner',
          route: '/main/Generales/ResponsableEscaner'
        },
        {
          displayName: 'Tipo de Sexo',
          route: '/main/Generales/Sexo'
        },
        {
          displayName: 'Tipo de Discapacidad Fisica',
          route: '/main/Generales/TipoDiscapacidad'
        },
        {
          displayName: 'Tipo de Empresa',
          route: '/main/Generales/TipoEmpresa'
        },
        {
          displayName: 'Tipo de Vehiculo en la empresa',
          route: '/main/Generales/TipoEmpresaVehiculo'
        },
        {
          displayName: 'Tipo de Puntos',
          route: '/main/Generales/TipoPunto'
        },
        {
          displayName: 'Nombre de la Zona',
          route: '/main/Generales/Zona'
        },
        {
          displayName: 'Tipo de Delito',
          route: '/main/Generales/TipoDelito'
        },
        {
          displayName: 'Grado de Alcohol del Agresor',
          route: '/main/Generales/GradoAlcoholAgresor'
        },
        {
          displayName: 'Grado de Alcohol de la Victima',
          route: '/main/Generales/GradoAlcoholVictima'
        },
      ]
    },
    {
      displayName: 'Libadores',
      route: '/main/Libadores',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/Libadores/Parametros',
          children: [
            {
              displayName: 'Tipo de Procedimiento',
              route: '/main/Libadores/Parametros/TipoProcedimiento'
            },
            {
              displayName: 'Tipo de Resolucion',
              route: '/main/Libadores/Parametros/TipoResolucion'
            }
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/Libadores/Datos',
          children: [
            {
              displayName: 'Datos de Libador',
              route: '/main/Libadores/Datos/Libador'
            },
            {
              displayName: 'Registro de Suceso',
              route: '/main/Libadores/Datos/Libadores'
            },
            {
              displayName: 'Datos de Georeferenciacion',
              route: '/main/Libadores/Datos/DatosGeoReferenciacion'
            },
          ]
        }
      ]
    },
    {
      displayName: 'Lesiones',
      route: '/main/Lesiones',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/Lesiones/Parametros',
          children: [
            {
              displayName: 'Grupos focales',
              route: '/main/Lesiones/Parametros/GrupoFocales'
            },
            {
              displayName: 'Procedencia de Grupo',
              route: '/main/Lesiones/Parametros/ProcedenciaGrupo'
            },
            {
              displayName: 'Tipo de Riña (Peleas)',
              route: '/main/Lesiones/Parametros/TipoRinia'
            },
            {
              displayName: 'Tipo de Agresion',
              route: '/main/Lesiones/Parametros/TipoAgresion'
            },
            {
              displayName: 'Relacion del Agresor con la victima',
              route: '/main/Lesiones/Parametros/RelacionAgresor'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/Lesiones/Datos',
          children: [
            {
              displayName: 'Datos del Agresor',
              route: '/main/Lesiones/Datos/Agresor'
            },
            {
              displayName: 'Datos de la Victima',
              route: '/main/Lesiones/Datos/Victima'
            },
            {
              displayName: 'Datos de Georeferenciacion',
              route: '/main/Lesiones/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Mecanismo de Agresor',
              route: '/main/Lesiones/Datos/MecanismoAgresor'
            },
            {
              displayName: 'Lesiones en el Agresor',
              route: '/main/Lesiones/Datos/LesionAgresor'
            },
            {
              displayName: 'Lesiones en la Victima',
              route: '/main/Lesiones/Datos/LesionVictima'
            },
            {
              displayName: 'Registro del Suceso',
              route: '/main/Lesiones/Datos/Lesiones'
            },
          ]
        },
      ]
    },
    {
      displayName: 'Violencia Intrafamiliar',
      route: '/main/ViolenciaIntraFamiliar',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/ViolenciaIntraFamiliar/Parametros',
          children: [
            {
              displayName: 'Objetos usados durante la agresion',
              route: '/main/ViolenciaIntraFamiliar/Parametros/ObjetoAgresion',
            },
            {
              displayName: 'Relacion del Agresor con la Victima',
              route: '/main/ViolenciaIntraFamiliar/Parametros/RelacionAgresor',
            },
            {
              displayName: 'Tipo de Delitos',
              route: '/main/ViolenciaIntraFamiliar/Parametros/TipoDelito',
            },
            {
              displayName: 'Tipo de Agresion',
              route: '/main/ViolenciaIntraFamiliar/Parametros/TipoAgresion',
            },
            {
              displayName: 'Intruccion Formal',
              route: '/main/ViolenciaIntraFamiliar/Parametros/InstruccionFormal',
            },
            {
              displayName: 'Frecuencia de Agresion entre agresor y victima',
              route: '/main/ViolenciaIntraFamiliar/Parametros/FrecuenciaAgresor',
            },
            {
              displayName: 'Motivos que llevaron a la agresion',
              route: '/main/ViolenciaIntraFamiliar/Parametros/Descadenante',
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/ViolenciaIntraFamiliar/Datos',
          children: [
            {
              displayName: 'Datos del Agresor',
              route: '/main/ViolenciaIntraFamiliar/Datos/Agresor',
            },
            {
              displayName: 'Datos de la Victima',
              route: '/main/ViolenciaIntraFamiliar/Datos/Victima',
            },
            {
              displayName: 'Datos de Georeferenciacion',
              route: '/main/ViolenciaIntraFamiliar/Datos/DatosGeoReferenciacion',
            },
            {
              displayName: 'Registro del Suceso',
              route: '/main/ViolenciaIntraFamiliar/Datos/ViolenciaIntraFamiliar',
            },
          ]

        }
      ]
    },
    {
      displayName: 'Decomisos',
      route: '/main/Decomisos',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/Decomisos/Parametros',
          children: [
            {
              displayName: 'Tipo de Procedimiento realizado',
              route: '/main/Decomisos/Parametros/TipoProcedimiento'
            },
            {
              displayName: 'Datos de Georeferenciacion',
              route: '/main/Decomisos/Parametros/DatosGeoReferenciacion'
            }
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/Decomisos/Datos',
          children: [
            {
              displayName: 'Datos del Vendedor',
              route: '/main/Decomisos/Datos/Vendedor'
            },
            {
              displayName: 'Datos de los Productos Decomisados',
              route: '/main/Decomisos/Datos/ProductoDecomisado'
            },
            {
              displayName: 'Lugar de Donacion para los productos que han sido decomisados',
              route: '/main/Decomisos/Datos/LugarDonacion'
            },
            {
              displayName: 'Registro del Suceso',
              route: '/main/Decomisos/Datos/Decomisos'
            },
          ]
        }
      ]
    },
    {
      displayName: 'Muertes Violentas',
      route: '/main/MuertesViolentas',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/MuertesViolentas/Parametros',
          children: [
            {
              displayName: 'Tipos de muertes',
              route: '/main/MuertesViolentas/Parametros/TipoMuerte'
            },
            {
              displayName: 'Arma usada en la muerte violenta',
              route: '/main/MuertesViolentas/Parametros/ArmMedioSuceso'
            },
            {
              displayName: 'Motivo del Deceso',
              route: '/main/MuertesViolentas/Parametros/MotivoMuerte'
            },
            {
              displayName: 'Discapacidad que presenta la victima',
              route: '/main/MuertesViolentas/Parametros/TipoDiscapacidad'
            },
            {
              displayName: 'Forma en que se encuentra el cuerpo del occiso',
              route: '/main/MuertesViolentas/Parametros/RestoVictima'
            }
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/MuertesViolentas/Datos',
          children: [
            {
              displayName: 'Datos de la Victima',
              route: '/main/MuertesViolentas/Datos/Victima'
            },
            {
              displayName: 'Datos de Georeferenciacion',
              route: '/main/MuertesViolentas/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Registro del Suceso',
              route: '/main/MuertesViolentas/Datos/MuertesViolentas'
            },
            {
              displayName: 'Datos del Medico que reporta la muerte',
              route: '/main/MuertesViolentas/Datos/Medico'
            },
            {
              displayName: 'Lugar donde fue encontrado el cuerpo de la victima',
              route: '/main/MuertesViolentas/Datos/LugarLevantamiento'
            },
            {
              displayName: 'Lugar hacia donde trasladan el cuerpo de la victima',
              route: '/main/MuertesViolentas/Datos/LugarTraslado'
            },

          ]
        }
      ]
    },
    {
      displayName: 'Accidente Transito',
      route: '/main/AccidenteTransito',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/AccidenteTransito/Parametros',
          children: [
            {
              displayName: 'MarcaVehiculo',
              route: '/main/AccidenteTransito/Parametros/MarcaVehiculo'
            },
            {
              displayName: 'ModeloVehiculo',
              route: '/main/AccidenteTransito/Parametros/ModeloVehiculo'
            },
            {
              displayName: 'ColorVehiculo',
              route: '/main/AccidenteTransito/Parametros/ColorVehiculo'
            },
            {
              displayName: 'TipoVehiculo',
              route: '/main/AccidenteTransito/Parametros/TipoVehiculo'
            },
            {
              displayName: 'ClaseAccidente',
              route: '/main/AccidenteTransito/Parametros/ClaseAccidente'
            },
            {
              displayName: 'TipoVia',
              route: '/main/AccidenteTransito/Parametros/TipoVia'
            },
            {
              displayName: 'CondicionCalzada',
              route: '/main/AccidenteTransito/Parametros/CondicionCalzada'
            },
            {
              displayName: 'CausaAccidente',
              route: '/main/AccidenteTransito/Parametros/CausaAccidente'
            },
            {
              displayName: 'MomentoAccidente',
              route: '/main/AccidenteTransito/Parametros/MomentoAccidente'
            },
            {
              displayName: 'ProcedenciaParte',
              route: '/main/AccidenteTransito/Parametros/ProcedenciaParte'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/AccidenteTransito/Datos',
          children: [
            {
              displayName: 'Victima',
              route: '/main/AccidenteTransito/Datos/Victima'
            },
            {
              displayName: 'GeoReferenciacion',
              route: '/main/AccidenteTransito/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Agresor',
              route: '/main/AccidenteTransito/Datos/Agresor'
            },
            {
              displayName: 'Accidente Transito',
              route: '/main/AccidenteTransito/Datos/AccidenteTransito'
            },
          ]
        }
      ]
    },
    {
      displayName: 'Robos y Hurtos General',
      route: '/main/RobosHurtosGeneral',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/RobosHurtosGeneral/Parametros',
          children: [
            {
              displayName: 'ModalidadDelito',
              route: '/main/RobosHurtosGeneral/Parametros/ModalidadDelito'
            },
            {
              displayName: 'Lugar',
              route: '/main/RobosHurtosGeneral/Parametros/Lugar'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/RobosHurtosGeneral/Datos',
          children: [
            {
              displayName: 'Victima',
              route: '/main/RobosHurtosGeneral/Datos/Victima'
            },
            {
              displayName: 'ObjetosHurtados',
              route: '/main/RobosHurtosGeneral/Datos/ObjetoHurtado'
            },
            {
              displayName: 'AutorDelito',
              route: '/main/RobosHurtosGeneral/Datos/AutorDelito'
            },
            {
              displayName: 'Agresor',
              route: '/main/RobosHurtosGeneral/Datos/Agresor'
            },
            {
              displayName: 'Afectados',
              route: '/main/RobosHurtosGeneral/Datos/Afectados'
            },
            {
              displayName: 'GeoReferenciacion',
              route: '/main/RobosHurtosGeneral/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'ObjetosAgresion',
              route: '/main/RobosHurtosGeneral/Datos/ObjetoAgresion'
            },
            {
              displayName: 'ObjetoRobadoVehiculo',
              route: '/main/RobosHurtosGeneral/Datos/ObjetoRobadoVehiculo'
            },
            {
              displayName: 'Registro de Suceso',
              route: '/main/RobosHurtosGeneral/Datos/RobosHurtosGeneral'
            },
          ]
        }
      ]
    },
    {
      displayName: 'Amenazas',
      route: '/main/Amenazas',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/Amenazas/Parametros',
          children: [
            {
              displayName: 'TipoAmenazas',
              route: '/main/Amenazas/Parametros/TipoAmenaza'
            },
            {
              displayName: 'CausaAmenaza',
              route: '/main/Amenazas/Parametros/CausaAmenaza'
            },
            {
              displayName: 'AlcoholAgresor',
              route: '/main/Amenazas/Parametros/AlcoholAgresor'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/Amenazas/Datos',
          children: [
            {
              displayName: 'Victima',
              route: '/main/Amenazas/Datos/Victima'
            },
            {
              displayName: 'Agresor',
              route: '/main/Amenazas/Datos/Agresor'
            },
            {
              displayName: 'Amenazas',
              route: '/main/Amenazas/Datos/Amenazas'
            },
            {
              displayName: 'GeoReferenciacion',
              route: '/main/Amenazas/Datos/DatosGeoReferenciacion'
            },
          ]
        }
      ]
    },
    {
      displayName: 'MicroTraficoDroga',
      route: '/main/MicroTraficoDroga',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/MicroTraficoDroga/Parametros',
          children: [
            {
              displayName: 'TipoProcedimiento',
              route: '/main/MicroTraficoDroga/Parametros/TipoProcedimiento'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/MicroTraficoDroga/Datos',
          children: [
            {
              displayName: 'DatosGeoReferenciacion',
              route: '/main/MicroTraficoDroga/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'EvidenciasEncontradas',
              route: '/main/MicroTraficoDroga/Datos/EvidenciaEncontrada'
            },
            {
              displayName: 'Agresor',
              route: '/main/MicroTraficoDroga/Datos/Agresor'
            },
            {
              displayName: 'QuienCometeDelito',
              route: '/main/MicroTraficoDroga/Datos/QuienCometeDelito'
            },
            {
              displayName: 'MicroTraficoDrogas',
              route: '/main/MicroTraficoDroga/Datos/MicroTraficoDroga'
            },
          ]
        }
      ]
    },
    {
      displayName: 'DelitosSexuales',
      route: '/main/DelitosSexuales',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/DelitosSexuales/Parametros',
          children: [
            {
              displayName: 'MecanismoAgresor',
              route: '/main/DelitosSexuales/Parametros/MecanismoAgresor'
            },
            {
              displayName: 'ContinuidadCaso',
              route: '/main/DelitosSexuales/Parametros/ContinuidadCaso'
            },
            {
              displayName: 'ObjetoAgresion',
              route: '/main/DelitosSexuales/Parametros/ObjetoAgresion'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/DelitosSexuales/Datos',
          children: [
            {
              displayName: 'DatosGeoreferenciacion',
              route: '/main/DelitosSexuales/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Agresor',
              route: '/main/DelitosSexuales/Datos/Agresor'
            },
            {
              displayName: 'Victima',
              route: '/main/DelitosSexuales/Datos/Victima'
            },
            {
              displayName: 'DelitosSexuales',
              route: '/main/DelitosSexuales/Datos/DelitosSexuales'
            },

          ]
        }
      ]
    },
    {

      displayName: 'PersonasDesaparecidas',
      route: '/main/PersonasDesaparecidas',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/PersonasDesaparecidas/Parametros',
          children: [

            {
              displayName: 'ParroquiaDesaparicion',
              route: '/main/PersonasDesaparecidas/Parametros/ParroquiaDesaparicion'
            },
            {
              displayName: 'MotivoDesaparicion',
              route: '/main/PersonasDesaparecidas/Parametros/MotivoDesaparicion'
            },
            {
              displayName: 'CondicionRegresaDesaparecido',
              route: '/main/PersonasDesaparecidas/Parametros/CondicionRegresaDesaparecido'
            },
            {
              displayName: 'ParentezcoPersona',
              route: '/main/PersonasDesaparecidas/Parametros/ParentezcoPersona'
            }
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/PersonasDesaparecidas/Datos',
          children: [
            {
              displayName: 'DatosGeoReferenciacion',
              route: '/main/PersonasDesaparecidas/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Agresor',
              route: '/main/PersonasDesaparecidas/Datos/Agresor'
            },
            {
              displayName: 'Victima',
              route: '/main/PersonasDesaparecidas/Datos/Victima'
            },
            {
              displayName: 'PersonasDesaparecidas',
              route: '/main/PersonasDesaparecidas/Datos/PersonasDesaparecidas'
            },

          ]
        }
      ]
    },
    {
      displayName: 'OtrosDelitos',
      route: '/main/OtrosDelitos',
      children: [
        {
          displayName: 'Datos',
          route: '/main/OtrosDelitos/Datos',
          children: [
            {
              displayName: 'DatosGeoReferenciacion',
              route: '/main/OtrosDelitos/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Victima',
              route: '/main/OtrosDelitos/Datos/Victima'
            },
            {
              displayName: 'OtrosDelitos',
              route: '/main/OtrosDelitos/Datos/OtrosDelitos'
            },
          ]
        }
      ]
    },
    {
      displayName: 'Robos Vehiculos',
      route: '/main/RobosVehiculos',
      children: [
        {
          displayName: 'Parametros',
          route: '/main/RobosVehiculos/Parametros',
          children: [
            {
              displayName: 'MarcaVehiculo',
              route: '/main/RobosVehiculos/Parametros/MarcaVehiculo'
            },
            {
              displayName: 'ModeloVehiculo',
              route: '/main/RobosVehiculos/Parametros/ModeloVehiculo'
            },
            {
              displayName: 'ColorVehiculo',
              route: '/main/RobosVehiculos/Parametros/ColorVehiculo'
            },
            {
              displayName: 'TipoVehiculo',
              route: '/main/RobosVehiculos/Parametros/TipoVehiculo'
            },
            {
              displayName: 'ModalidadRobo',
              route: '/main/RobosVehiculos/Parametros/ModalidadRobo'
            },
          ]
        },
        {
          displayName: 'Datos',
          route: '/main/RobosVehiculos/Datos',
          children: [
            {
              displayName: 'Agresor',
              route: '/main/RobosVehiculos/Datos/Agresor'
            },
            {
              displayName: 'Victima',
              route: '/main/RobosVehiculos/Datos/Victima'
            },
            {
              displayName: 'GeoReferenciacion',
              route: '/main/RobosVehiculos/Datos/DatosGeoReferenciacion'
            },
            {
              displayName: 'Vehiculo',
              route: '/main/RobosVehiculos/Datos/Vehiculo'
            },
            {
              displayName: 'RobosVehiculos',
              route: '/main/RobosVehiculos/Datos/RobosVehiculos'
            },
          ]
        }
      ]
    }

  ];

  navItems: NavItem[];

  constructor(
    private router: Router,
    private common: CommonService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe(function (event: Event) {
      console.log(event);
      if (this.common.loginData === null) {
        return;
      }
      if (event instanceof NavigationEnd) {

        if (event.urlAfterRedirects.startsWith('/auth')) {
          return;
        }

        let canAccess = false;


        const allItems: NavItem[] = [];

        this.navItems.forEach((item) => {
          allItems.push(...getAllItems(item));
        });


        canAccess = allItems.filter((item: NavItem) => {
          return item.route === event.urlAfterRedirects
        }).length !== 0;


        if (!canAccess) {
          this.toastr.error('You can\'t visit this page.', 'Error');
          this.router.navigate(['/main/Dashboard']);
        } else {
          this.currentUrl.next(event.urlAfterRedirects);
        }
      }
    }.bind(this));
  }

  updateNavItemsWithMenuListInfo() {
    this.navItems = this.allNavItems.filter((bigModuleNavItem) => {
      return this.common.loginData.menuRolList.filter((menuRol: any) => menuRol.menu.url === bigModuleNavItem.displayName).length !== 0;
    });
  }

}
