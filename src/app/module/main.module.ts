import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from '../component/dashboard-page/dashboard-page.component';
import {FrecuenciaAgresorPageComponent} from '../component/frecuencia-agresor-page/frecuencia-agresor-page.component';
import {HttpClientModule} from '@angular/common/http';
import {LibadorPageComponent} from '../component/libador-page/libador-page.component';
import {LibadoresPageComponent} from '../component/libadores-page/libadores-page.component';
import {DatosGeoReferenciacionPageComponent} from '../component/datos-geo-referenciacion-page/datos-geo-referenciacion-page.component';
import {MaterialModule} from './material.module';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {TipoResolucionPageComponent} from '../component/tipo-resolucion-page/tipo-resolucion-page.component';
import {TipoProcedimientoPageComponent} from '../component/tipo-procedimiento-page/tipo-procedimiento-page.component';
import {ParroquiaPageComponent} from '../component/parroquia-page/parroquia-page.component';
import {ZonaPageComponent} from '../component/zona-page/zona-page.component';
import {CircuitoPageComponent} from '../component/circuito-page/circuito-page.component';
import {DistritoPageComponent} from '../component/distrito-page/distrito-page.component';
import {AgresorPageComponent} from '../component/agresor-page/agresor-page.component';
import {SexoPageComponent} from '../component/sexo-page/sexo-page.component';
import {NacionalidadPageComponent} from '../component/nacionalidad-page/nacionalidad-page.component';
import {EtniaPageComponent} from '../component/etnia-page/etnia-page.component';
import {EstadoCivilPageComponent} from '../component/estado-civil-page/estado-civil-page.component';
import {TipoDiscapacidadPageComponent} from '../component/tipo-discapacidad-page/tipo-discapacidad-page.component';
import {OcupacionPageComponent} from '../component/ocupacion-page/ocupacion-page.component';
import {RegionPageComponent} from '../component/region-page/region-page.component';
import {RelacionAgresorPageComponent} from '../component/relacion-agresor-page/relacion-agresor-page.component';
import {VictimaPageComponent} from '../component/victima-page/victima-page.component';
import {TipoEmpresaPageComponent} from '../component/tipo-empresa-page/tipo-empresa-page.component';
import {MesPageComponent} from '../component/mes-page/mes-page.component';
import {ViolenciaIntraFamiliarPageComponent} from '../component/violencia-intra-familiar-page/violencia-intra-familiar-page.component';
import {DiaPageComponent} from '../component/dia-page/dia-page.component';
import {TipoDelitoPageComponent} from '../component/tipo-delito-page/tipo-delito-page.component';
import {TipoPuntoPageComponent} from '../component/tipo-punto-page/tipo-punto-page.component';
import {LugarPageComponent} from '../component/lugar-page/lugar-page.component';
import {BarrioPageComponent} from '../component/barrio-page/barrio-page.component';
import {FiscaliaPageComponent} from '../component/fiscalia-page/fiscalia-page.component';
import {FiscalPageComponent} from '../component/fiscal-page/fiscal-page.component';
import {PipeModule} from './pipe.module';
import {DescadenantePageComponent} from '../component/descadenante-page/descadenante-page.component';
import {ObjetoAgresionPageComponent} from '../component/objeto-agresion-page/objeto-agresion-page.component';
import {TipoAgresionPageComponent} from '../component/tipo-agresion-page/tipo-agresion-page.component';
import {InstruccionFormalPageComponent} from '../component/instruccion-formal-page/instruccion-formal-page.component';
import {VendedorPageComponent} from '../component/vendedor-page/vendedor-page.component';
import {ProductoDecomisadoPageComponent} from '../component/producto-decomisado-page/producto-decomisado-page.component';
import {LugarDonacionPageComponent} from '../component/lugar-donacion-page/lugar-donacion-page.component';
import {DecomisosPageComponent} from '../component/decomisos-page/decomisos-page.component';
import {ResponsableEscanerPageComponent} from '../component/responsable-escaner-page/responsable-escaner-page.component';
import {MecanismoAgresorPageComponent} from '../component/mecanismo-agresor-page/mecanismo-agresor-page.component';
import {TipoRiniaPageComponent} from '../component/tipo-rinia-page/tipo-rinia-page.component';
import {GrupoFocalesPageComponent} from '../component/grupo-focales-page/grupo-focales-page.component';
import {LesionesPageComponent} from '../component/lesiones-page/lesiones-page.component';
import {IndicioEstupefacientesPageComponent} from '../component/indicio-estupefacientes-page/indicio-estupefacientes-page.component';
import {RangoLesionPageComponent} from '../component/rango-lesion-page/rango-lesion-page.component';
import {GradoAlcoholAgresorPageComponent} from '../component/grado-alcohol-agresor-page/grado-alcohol-agresor-page.component';
import {AlcoholVictimaPageComponent} from '../component/alcohol-victima-page/alcohol-victima-page.component';
import {GradoAlcoholVictimaPageComponent} from '../component/grado-alcohol-victima-page/grado-alcohol-victima-page.component';
import {ArmMedioSucesoPageComponent} from '../component/arm-medio-suceso-page/arm-medio-suceso-page.component';
import {LugarLevantamientoPageComponent} from '../component/lugar-levantamiento-page/lugar-levantamiento-page.component';
import {TipoMuertePageComponent} from '../component/tipo-muerte-page/tipo-muerte-page.component';
import {LugarTrasladoPageComponent} from '../component/lugar-traslado-page/lugar-traslado-page.component';
import {RestoVictimaPageComponent} from '../component/resto-victima-page/resto-victima-page.component';
import {MotivoMuertePageComponent} from '../component/motivo-muerte-page/motivo-muerte-page.component';
import {MedicoPageComponent} from '../component/medico-page/medico-page.component';
import {ObjetoRobadoVehiculoPageComponent} from '../component/objeto-robado-vehiculo-page/objeto-robado-vehiculo-page.component';
import {ModalidadRoboPageComponent} from '../component/modalidad-robo-page/modalidad-robo-page.component';
import {AutorDelitoPageComponent} from '../component/autor-delito-page/autor-delito-page.component';
import {ParteRobadaVehiculoPageComponent} from '../component/parte-robada-vehiculo-page/parte-robada-vehiculo-page.component';
import {RhvAgresoresPageComponent} from '../component/rhv-agresores-page/rhv-agresores-page.component';
import {MarcaVehiculoPageComponent} from '../component/marca-vehiculo-page/marca-vehiculo-page.component';
import {TipoEmpresaVehiculoPageComponent} from '../component/tipo-empresa-vehiculo-page/tipo-empresa-vehiculo-page.component';
import {ServicioVehiculoPageComponent} from '../component/servicio-vehiculo-page/servicio-vehiculo-page.component';
import {TipoVehiculoPageComponent} from '../component/tipo-vehiculo-page/tipo-vehiculo-page.component';
import {MuertesViolentasPageComponent} from '../component/muertes-violentas-page/muertes-violentas-page.component';
import {DsContinuidadCasoPageComponent} from '../component/ds-continuidad-caso-page/ds-continuidad-caso-page.component';
import {AmGradoAlcoholAgresorPageComponent} from '../component/am-grado-alcohol-agresor-page/am-grado-alcohol-agresor-page.component';
import {AmAlcoholAgresorPageComponent} from '../component/am-alcohol-agresor-page/am-alcohol-agresor-page.component';
import {AmCausaAmenazaPageComponent} from '../component/am-causa-amenaza-page/am-causa-amenaza-page.component';
import {TipoAmenazaPageComponent} from '../component/tipo-amenaza-page/tipo-amenaza-page.component';
import {DelitosSexualesPageComponent} from '../component/delitos-sexuales-page/delitos-sexuales-page.component';
import {CausaAmenazaPageComponent} from '../component/causa-amenaza-page/causa-amenaza-page.component';
import {AmenazasPageComponent} from '../component/amenazas-page/amenazas-page.component';
import {AmTipoAmenazaPageComponent} from '../component/am-tipo-amenaza-page/am-tipo-amenaza-page.component';
import {QuienCometeDelitoPageComponent} from '../component/quien-comete-delito-page/quien-comete-delito-page.component';
import {SustanciaMicroTraficoPageComponent} from '../component/sustancia-micro-trafico-page/sustancia-micro-trafico-page.component';
import {EvidenciaEncontradaPageComponent} from '../component/evidencia-encontrada-page/evidencia-encontrada-page.component';
import {TipoViaPageComponent} from '../component/tipo-via-page/tipo-via-page.component';
import {CondicionCalzadaPageComponent} from '../component/condicion-calzada-page/condicion-calzada-page.component';
import {MomentoAccidentePageComponent} from '../component/momento-accidente-page/momento-accidente-page.component';
import {ProcedenciaPartePageComponent} from '../component/procedencia-parte-page/procedencia-parte-page.component';
import {CausaAccidentePageComponent} from '../component/causa-accidente-page/causa-accidente-page.component';
import {MicroTraficoDrogaPageComponent} from '../component/micro-trafico-droga-page/micro-trafico-droga-page.component';
import {ColorVehiculoPageComponent} from '../component/color-vehiculo-page/color-vehiculo-page.component';
import {ModeloVehiculoPageComponent} from '../component/modelo-vehiculo-page/modelo-vehiculo-page.component';
import {ClaseAccidentePageComponent} from '../component/clase-accidente-page/clase-accidente-page.component';
import {VehiculoPageComponent} from '../component/vehiculo-page/vehiculo-page.component';
import {RobosVehiculosPageComponent} from '../component/robos-vehiculos-page/robos-vehiculos-page.component';
import {AccidenteTransitoPageComponent} from '../component/accidente-transito-page/accidente-transito-page.component';
import {PdCondicionRegresaDesaparecidoPageComponent} from '../component/pd-condicion-regresa-desaparecido-page/pd-condicion-regresa-desaparecido-page.component';
import {ParroquiaDesaparicionPageComponent} from '../component/parroquia-desaparicion-page/parroquia-desaparicion-page.component';
import {ModalidadDelitoPageComponent} from '../component/modalidad-delito-page/modalidad-delito-page.component';
import {AfectadoPageComponent} from '../component/afectado-page/afectado-page.component';
import {ObjetoHurtadoPageComponent} from '../component/objeto-hurtado-page/objeto-hurtado-page.component';
import {PersonasDesaparecidasPageComponent} from '../component/personas-desaparecidas-page/personas-desaparecidas-page.component';
import {ProcedenciaGrupoPageComponent} from '../component/procedencia-grupo-page/procedencia-grupo-page.component';
import {AlcoholAgresorPageComponent} from '../component/alcohol-agresor-page/alcohol-agresor-page.component';
import {ParentezcoPersonaPageComponent} from '../component/parentezco-persona-page/parentezco-persona-page.component';
import {OtrosDelitosPageComponent} from '../component/otros-delitos-page/otros-delitos-page.component';
import {LesionVictimaPageComponent} from '../component/lesion-victima-page/lesion-victima-page.component';
import {LesionAgresorPageComponent} from '../component/lesion-agresor-page/lesion-agresor-page.component';
import {PdMotivoDesaparicionPageComponent} from '../component/pd-motivo-desaparicion-page/pd-motivo-desaparicion-page.component';
import {RobosHurtosGeneralPageComponent} from '../component/robos-hurtos-general-page/robos-hurtos-general-page.component';
import {UsuariosPageComponent} from '../component/usuarios-page/usuarios-page.component';
import {RolPageComponent} from '../component/rol-page/rol-page.component';
import {MenuComponent} from '../component/menu/menu.component';
import {MenuRolComponent} from '../component/menu-rol/menu-rol.component';
import {LibadorCreateDialogComponent} from '../component/libador-create-dialog/libador-create-dialog.component';
import {LesionCreateDialogComponent} from '../component/lesion-create-dialog/lesion-create-dialog.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardPageComponent
  },

  // Admin
  {
    path: 'Admin/Usuarios',
    component: UsuariosPageComponent
  },
  {
    path: 'Admin/Rol',
    component: RolPageComponent
  },
  {
    path: 'Admin/Menu',
    component: MenuComponent
  },
  {
    path: 'Admin/MenuRol',
    component: MenuRolComponent

  },
  // Generals
  {
    path: 'Generales/Barrio',
    component: BarrioPageComponent
  },
  {
    path: 'Generales/Circuito',
    component: CircuitoPageComponent
  },
  {
    path: 'Generales/Distrito',
    component: DistritoPageComponent
  },
  {
    path: 'Generales/Sexo',
    component: SexoPageComponent
  },
  {
    path: 'Generales/Nacionalidad',
    component: NacionalidadPageComponent
  },
  {
    path: 'Generales/Etnia',
    component: EtniaPageComponent
  },
  {
    path: 'Generales/EstadoCivil',
    component: EstadoCivilPageComponent
  },
  {
    path: 'Generales/Etnia',
    component: EtniaPageComponent
  },
  {
    path: 'Generales/Lugar',
    component: LugarPageComponent
  },
  {
    path: 'Generales/Nacionalidad',
    component: NacionalidadPageComponent
  },
  {
    path: 'Generales/Ocupacion',
    component: OcupacionPageComponent
  },
  {
    path: 'Generales/Parroquia',
    component: ParroquiaPageComponent
  },
  {
    path: 'Generales/Region',
    component: RegionPageComponent
  },
  {
    path: 'Generales/ResponsableEscaner',
    component: ResponsableEscanerPageComponent
  },
  {
    path: 'Generales/Sexo',
    component: SexoPageComponent
  },
  {
    path: 'Generales/TipoDiscapacidad',
    component: TipoDiscapacidadPageComponent
  },
  {
    path: 'Generales/TipoEmpresa',
    component: TipoEmpresaPageComponent
  },
  {
    path: 'Generales/TipoEmpresaVehiculo',
    component: TipoEmpresaVehiculoPageComponent
  },
  {
    path: 'Generales/TipoPunto',
    component: TipoPuntoPageComponent
  },
  {
    path: 'Generales/Zona',
    component: ZonaPageComponent
  },
  {
    path: 'Generales/TipoDelito',
    component: TipoDelitoPageComponent
  },
  {
    path: 'Generales/GradoAlcoholAgresor',
    component: GradoAlcoholAgresorPageComponent
  },
  {
    path: 'Generales/GradoAlcoholVictima',
    component: GradoAlcoholVictimaPageComponent
  },
  // Libadores
  {
    path: 'Libadores/Parametros/TipoProcedimiento',
    component: TipoProcedimientoPageComponent
  },
  {
    path: 'Libadores/Parametros/TipoResolucion',
    component: TipoResolucionPageComponent
  },
  {
    path: 'Libadores/Datos/Libador',
    component: LibadorPageComponent
  },
  {
    path: 'Libadores/Datos/Libadores',
    component: LibadoresPageComponent
  },
  {
    path: 'Libadores/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
//   Lesiones
  {
    path: 'Lesiones/Parametros/GrupoFocales',
    component: GrupoFocalesPageComponent
  },
  {
    path: 'Lesiones/Parametros/ProcedenciaGrupo',
    component: ProcedenciaGrupoPageComponent
  },
  {
    path: 'Lesiones/Parametros/TipoRinia',
    component: TipoRiniaPageComponent
  },
  {
    path: 'Lesiones/Parametros/TipoAgresion',
    component: TipoAgresionPageComponent
  },
  {
    path: 'Lesiones/Parametros/RelacionAgresor',
    component: RelacionAgresorPageComponent
  },
  {
    path: 'Lesiones/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'Lesiones/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'Lesiones/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'Lesiones/Datos/MecanismoAgresor',
    component: MecanismoAgresorPageComponent
  },
  {
    path: 'Lesiones/Datos/LesionAgresor',
    component: LesionAgresorPageComponent
  },
  {
    path: 'Lesiones/Datos/LesionVictima',
    component: LesionVictimaPageComponent
  },
  {
    path: 'Lesiones/Datos/Lesiones',
    component: LesionesPageComponent
  },
  {
    path: 'Lesiones/Datos/Lesiones',
    component: LesionesPageComponent
  },
  // ViolenciaIntraFamiliar
  {
    path: 'ViolenciaIntraFamiliar/Parametros/ObjetoAgresion',
    component: ObjetoAgresionPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Parametros/RelacionAgresor',
    component: RelacionAgresorPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Parametros/TipoDelito',
    component: TipoDelitoPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Parametros/TipoAgresion',
    component: TipoAgresionPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Parametros/InstruccionFormal',
    component: InstruccionFormalPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Parametros/FrecuenciaAgresor',
    component: FrecuenciaAgresorPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Parametros/Descadenante',
    component: DescadenantePageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'ViolenciaIntraFamiliar/Datos/ViolenciaIntraFamiliar',
    component: ViolenciaIntraFamiliarPageComponent
  },
  // Decomisos
  {
    path: 'Decomisos/Parametros/TipoProcedimiento',
    component: TipoProcedimientoPageComponent
  },
  {
    path: 'Decomisos/Parametros/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'Decomisos/Datos/Vendedor',
    component: VendedorPageComponent
  },
  {
    path: 'Decomisos/Datos/ProductoDecomisado',
    component: ProductoDecomisadoPageComponent
  },
  {
    path: 'Decomisos/Datos/LugarDonacion',
    component: LugarDonacionPageComponent
  },
  {
    path: 'Decomisos/Datos/Decomisos',
    component: DecomisosPageComponent
  },
  // MuertesViolentas
  {
    path: 'MuertesViolentas/Parametros/TipoMuerte',
    component: TipoMuertePageComponent
  },
  {
    path: 'MuertesViolentas/Parametros/ArmMedioSuceso',
    component: ArmMedioSucesoPageComponent
  },
  {
    path: 'MuertesViolentas/Parametros/MotivoMuerte',
    component: MotivoMuertePageComponent
  },
  {
    path: 'MuertesViolentas/Parametros/TipoDiscapacidad',
    component: TipoDiscapacidadPageComponent
  },
  {
    path: 'MuertesViolentas/Parametros/RestoVictima',
    component: RestoVictimaPageComponent
  },
  {
    path: 'MuertesViolentas/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'MuertesViolentas/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'MuertesViolentas/Datos/MuertesViolentas',
    component: MuertesViolentasPageComponent
  },
  {
    path: 'MuertesViolentas/Datos/Medico',
    component: MedicoPageComponent
  },
  {
    path: 'MuertesViolentas/Datos/LugarLevantamiento',
    component: LugarLevantamientoPageComponent
  },
  {
    path: 'MuertesViolentas/Datos/LugarTraslado',
    component: LugarTrasladoPageComponent
  },
// AccidenteTransito
  {
    path: 'AccidenteTransito/Parametros/MarcaVehiculo',
    component: MarcaVehiculoPageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/ModeloVehiculo',
    component: ModeloVehiculoPageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/ColorVehiculo',
    component: ColorVehiculoPageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/TipoVehiculo',
    component: TipoVehiculoPageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/ClaseAccidente',
    component: ClaseAccidentePageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/TipoVia',
    component: TipoViaPageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/CondicionCalzada',
    component: CondicionCalzadaPageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/CausaAccidente',
    component: CausaAccidentePageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/MomentoAccidente',
    component: MomentoAccidentePageComponent
  },
  {
    path: 'AccidenteTransito/Parametros/ProcedenciaParte',
    component: ProcedenciaPartePageComponent
  },
  {
    path: 'AccidenteTransito/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'AccidenteTransito/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'AccidenteTransito/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'AccidenteTransito/Datos/AccidenteTransito',
    component: AccidenteTransitoPageComponent
  },
  // RobosHurtosGeneral
  {
    path: 'RobosHurtosGeneral/Parametros/ModalidadDelito',
    component: ModalidadDelitoPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Parametros/Lugar',
    component: LugarPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/ObjetoHurtado',
    component: ObjetoHurtadoPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/AutorDelito',
    component: AutorDelitoPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/Afectados',
    component: AfectadoPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/ObjetoAgresion',
    component: ObjetoAgresionPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/ObjetoRobadoVehiculo',
    component: ObjetoRobadoVehiculoPageComponent
  },
  {
    path: 'RobosHurtosGeneral/Datos/RobosHurtosGeneral',
    component: RobosHurtosGeneralPageComponent
  },
  // Amenazas
  {
    path: 'Amenazas/Parametros/TipoAmenaza',
    component: TipoAmenazaPageComponent
  },
  {
    path: 'Amenazas/Parametros/CausaAmenaza',
    component: CausaAmenazaPageComponent
  },
  {
    path: 'Amenazas/Parametros/AlcoholAgresor',
    component: AlcoholAgresorPageComponent
  },
  {
    path: 'Amenazas/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'Amenazas/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'Amenazas/Datos/Amenazas',
    component: AmenazasPageComponent
  },
  {
    path: 'Amenazas/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  // MicroTraficoDroga
  {
    path: 'MicroTraficoDroga/Parametros/TipoProcedimiento',
    component: TipoProcedimientoPageComponent
  },
  {
    path: 'MicroTraficoDroga/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'MicroTraficoDroga/Datos/EvidenciaEncontrada',
    component: EvidenciaEncontradaPageComponent
  },
  {
    path: 'MicroTraficoDroga/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'MicroTraficoDroga/Datos/QuienCometeDelito',
    component: QuienCometeDelitoPageComponent
  },
  {
    path: 'MicroTraficoDroga/Datos/MicroTraficoDroga',
    component: MicroTraficoDrogaPageComponent
  },
  // DelitosSexuales
  {
    path: 'DelitosSexuales/Parametros/MecanismoAgresor',
    component: MecanismoAgresorPageComponent
  },
  {
    path: 'DelitosSexuales/Parametros/ContinuidadCaso',
    component: DsContinuidadCasoPageComponent
  },
  {
    path: 'DelitosSexuales/Parametros/ObjetoAgresion',
    component: ObjetoAgresionPageComponent
  },
  {
    path: 'DelitosSexuales/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'DelitosSexuales/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'DelitosSexuales/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'DelitosSexuales/Datos/DelitosSexuales',
    component: DelitosSexualesPageComponent
  },
  // PersonasDesaparecidas
  {
    path: 'PersonasDesaparecidas/Parametros/ParroquiaDesaparicion',
    component: ParroquiaDesaparicionPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Parametros/MotivoDesaparicion',
    component: PdMotivoDesaparicionPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Parametros/CondicionRegresaDesaparecido',
    component: PdCondicionRegresaDesaparecidoPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Parametros/ParentezcoPersona',
    component: ParentezcoPersonaPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'PersonasDesaparecidas/Datos/PersonasDesaparecidas',
    component: PersonasDesaparecidasPageComponent
  },
  // OtrosDelitos
  {
    path: 'OtrosDelitos/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'OtrosDelitos/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'OtrosDelitos/Datos/OtrosDelitos',
    component: OtrosDelitosPageComponent
  },
  // RobosVehiculos
  {
    path: 'RobosVehiculos/Parametros/MarcaVehiculo',
    component: MarcaVehiculoPageComponent
  },
  {
    path: 'RobosVehiculos/Parametros/ModeloVehiculo',
    component: ModeloVehiculoPageComponent
  },
  {
    path: 'RobosVehiculos/Parametros/ColorVehiculo',
    component: ColorVehiculoPageComponent
  },
  {
    path: 'RobosVehiculos/Parametros/TipoVehiculo',
    component: TipoVehiculoPageComponent
  },
  {
    path: 'RobosVehiculos/Parametros/ModalidadRobo',
    component: ModalidadRoboPageComponent
  },
  {
    path: 'RobosVehiculos/Datos/Agresor',
    component: AgresorPageComponent
  },
  {
    path: 'RobosVehiculos/Datos/Victima',
    component: VictimaPageComponent
  },
  {
    path: 'RobosVehiculos/Datos/DatosGeoReferenciacion',
    component: DatosGeoReferenciacionPageComponent
  },
  {
    path: 'RobosVehiculos/Datos/Vehiculo',
    component: VehiculoPageComponent
  },
  {
    path: 'RobosVehiculos/Datos/RobosVehiculos',
    component: RobosVehiculosPageComponent
  },
];

@NgModule({
  declarations: [
    DashboardPageComponent,
    FrecuenciaAgresorPageComponent,
    LibadorPageComponent,
    LibadoresPageComponent,
    DatosGeoReferenciacionPageComponent,
    TipoResolucionPageComponent,
    TipoProcedimientoPageComponent,
    ParroquiaPageComponent,
    ZonaPageComponent,
    CircuitoPageComponent,
    DistritoPageComponent,
    AgresorPageComponent,
    SexoPageComponent,
    NacionalidadPageComponent,
    EtniaPageComponent,
    EstadoCivilPageComponent,
    TipoDiscapacidadPageComponent,
    OcupacionPageComponent,
    RegionPageComponent,
    RelacionAgresorPageComponent,
    VictimaPageComponent,
    TipoEmpresaPageComponent,
    MesPageComponent,
    DiaPageComponent,
    ViolenciaIntraFamiliarPageComponent,
    TipoDelitoPageComponent,
    TipoPuntoPageComponent,
    LugarPageComponent,
    BarrioPageComponent,
    FiscaliaPageComponent,
    FiscalPageComponent,
    DescadenantePageComponent,
    ObjetoAgresionPageComponent,
    TipoAgresionPageComponent,
    InstruccionFormalPageComponent,
    VendedorPageComponent,
    ProductoDecomisadoPageComponent,
    LugarDonacionPageComponent,
    DecomisosPageComponent,
    ResponsableEscanerPageComponent,
    MecanismoAgresorPageComponent,
    TipoRiniaPageComponent,
    GrupoFocalesPageComponent,
    LesionesPageComponent,
    IndicioEstupefacientesPageComponent,
    RangoLesionPageComponent,
    GradoAlcoholAgresorPageComponent,
    AlcoholVictimaPageComponent,
    GradoAlcoholVictimaPageComponent,
    ArmMedioSucesoPageComponent,
    LugarLevantamientoPageComponent,
    TipoMuertePageComponent,
    LugarTrasladoPageComponent,
    RestoVictimaPageComponent,
    MotivoMuertePageComponent,
    MedicoPageComponent,
    ObjetoRobadoVehiculoPageComponent,
    ModalidadRoboPageComponent,
    AutorDelitoPageComponent,
    ParteRobadaVehiculoPageComponent,
    RhvAgresoresPageComponent,
    MarcaVehiculoPageComponent,
    TipoEmpresaVehiculoPageComponent,
    ServicioVehiculoPageComponent,
    TipoVehiculoPageComponent,
    MuertesViolentasPageComponent,
    DsContinuidadCasoPageComponent,
    AmGradoAlcoholAgresorPageComponent,
    AmAlcoholAgresorPageComponent,
    AmCausaAmenazaPageComponent,
    TipoAmenazaPageComponent,
    DelitosSexualesPageComponent,
    CausaAmenazaPageComponent,
    AmenazasPageComponent,
    AmTipoAmenazaPageComponent,
    QuienCometeDelitoPageComponent,
    SustanciaMicroTraficoPageComponent,
    EvidenciaEncontradaPageComponent,
    MicroTraficoDrogaPageComponent,
    TipoViaPageComponent,
    CondicionCalzadaPageComponent,
    MomentoAccidentePageComponent,
    ProcedenciaPartePageComponent,
    CausaAccidentePageComponent,
    ColorVehiculoPageComponent,
    ModeloVehiculoPageComponent,
    ClaseAccidentePageComponent,
    VehiculoPageComponent,
    RobosVehiculosPageComponent,
    AccidenteTransitoPageComponent,
    PdCondicionRegresaDesaparecidoPageComponent,
    ParroquiaDesaparicionPageComponent,
    ModalidadDelitoPageComponent,
    AfectadoPageComponent,
    ObjetoHurtadoPageComponent,
    PersonasDesaparecidasPageComponent,
    ProcedenciaGrupoPageComponent,
    AlcoholAgresorPageComponent,
    ParentezcoPersonaPageComponent,
    OtrosDelitosPageComponent,
    RobosHurtosGeneralPageComponent,
    LesionVictimaPageComponent,
    LesionAgresorPageComponent,
    PdMotivoDesaparicionPageComponent,
    UsuariosPageComponent,
    RolPageComponent,
    MenuComponent,
    MenuRolComponent,
    LibadorCreateDialogComponent,
    LesionCreateDialogComponent
  ],
  entryComponents: [
    LibadorCreateDialogComponent,
    LesionCreateDialogComponent
  ],
  imports: [

    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    PipeModule,

    NgxMatSelectSearchModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: []
})
export class MainModule {
}
