/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  21-10-2014
 */
$().ready(function () {
    /**
     * Inicialmente se habilita solo la pestaña del listado
     */
    $('#jqxTabs').jqxTabs('theme', 'oasis');
    $('#jqxTabs').jqxTabs('enableAt', 1);
    $('#jqxTabs').jqxTabs('disableAt', 1);
    $('#jqxTabs').jqxTabs('disableAt', 2);
    $('#jqxTabs').jqxTabs('disableAt', 3);
    $('#jqxTabs').jqxTabs('disableAt', 4);

    definirGrillaParaListaRelaborales();
    habilitarCamposParaNuevoRegistroDeRelacionLaboral();
    $("#btnGuardarNuevo").click(function (){
        var ok = validaFormularioPorNuevoRegistro();
        if (ok){
            guardarNuevoRegistro();
        }
    });
    $("#btnGuardarEditar").click(function (){
        var ok = validaFormularioPorEditarRegistro();
        if (ok){
            guardarRegistroEditado();
        }
    });
    $("#btnGuardarBaja").click(function (){
        var ok = validaFormularioPorBajaRegistro();
        if (ok){
            guardarRegistroBaja();
        }
    });
    $("#btnCancelarNuevo").click(function (){
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $("#msjs-alert").hide();
        deshabilitarCamposParaNuevoRegistroDeRelacionLaboral();
    });
    $("#btnCancelarEditar").click(function (){
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $("#msjs-alert").hide();
        deshabilitarCamposParaEditarRegistroDeRelacionLaboral();
    });
    $("#btnCancelarBaja").click(function (){
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $("#msjs-alert").hide();
        deshabilitarCamposParaBajaRegistroDeRelacionLaboral();
    });
    $("#btnCancelarVista").click(function (){
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $("#msjs-alert").hide();
    });
    $("#btnBuscarCargo").click(function (){
        $("#popupWindowCargo").jqxWindow('open');
        definirGrillaParaSeleccionarCargoAcefalo(0,'');
    });
    $("#btnBuscarCargoEditar").click(function (){
        $("#popupWindowCargo").jqxWindow('open');
        definirGrillaParaSeleccionarCargoAcefaloParaEditar(0,'');
    });
    $("#lstMotivosBajas").change(function (){
        var res = this.value.split("_");
        $("#hdnFechaRenBaja").val(res[0]);
        $("#hdnFechaAceptaRenBaja").val(res[1]);
        $("#hdnFechaAgraServBaja").val(res[2]);
        if(res[0]>0)defineFechasBajas(res[1],res[2],res[3]);
        else $("#divFechasBaja").hide();
    });
    $("#liList").click(function(){
        $("#btnCancelarNuevo").click();
        $("#btnCancelarEditar").click();
        $("#btnCancelarBaja").click();
    });
    $("#popupWindowCargo").jqxWindow({
        width: '100%',height:300, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#btnCancelar"), modalOpacity: 0.01
    });
    $('#btnDesfiltrartodo').click(function () {
        $("#jqxgrid").jqxGrid('clearfilters');
    });
    /**
     * Definición de la ventana donde se ve el historial de registros de relación laboral
     */
    $('#HistorialSplitter').jqxSplitter({ theme:'oasis',width: '100%', height: 480, panels: [{ size: '8%' },{ size: '92%'}] });

    /*
     *   Función para la inserción obligatoria de datos numéricos en los campos de clase.
     */
    $('.numeral').keyup(function (event) {
        if ($(this).val() != '') {
            $(this).val($(this).val().replace(/[^0-9]/g, ""));
        }
    });

    /*
     *   Función para la inserción obligatoria de letras distintas a números en los campos de clase.
     */
    $('.literal').keyup(function (event) {
        if ($(this).val() != '') {
            $(this).val($(this).val().replace(/[^A-Z,a-z,ñ,Ñ, ]/g, ""));
        }
    });
    $(document).keypress(OperaEvento);
    $(document).keyup(OperaEvento);
});
/**
 * Función para definir la grilla principal (listado) para la gestión de relaciones laborales.
 */
function definirGrillaParaListaRelaborales(){
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'fecha_nac', type: 'string' },
            { name: 'edad', type: 'integer' },
            { name: 'lugar_nac', type: 'integer' },
            { name: 'genero', type: 'integer' },
            { name: 'e_civil', type: 'integer' },
            { name: 'id_relaboral', type: 'integer' },
            { name: 'id_persona', type: 'integer' },
            { name: 'tiene_contrato_vigente', type: 'integer' },
            { name: 'id_persona', type: 'integer' },
            { name: 'id_fin_partida', type: 'integer' },
            { name: 'finpartida', type: 'string' },
            { name: 'ubicacion', type: 'string' },
            { name: 'id_condicion', type: 'integer' },
            { name: 'condicion', type: 'string' },
            { name: 'id_cargo', type: 'integer' },
            { name: 'cargo_codigo', type: 'string' },
            { name: 'estado', type: 'integer' },
            { name: 'estado_descripcion', type: 'string' },
            { name: 'nombres', type: 'string'},
            { name: 'ci', type: 'string' },
            { name: 'expd', type: 'string' },
            { name: 'num_complemento', type: 'string' },
            { name: 'id_organigrama', type: 'integer' },
            { name: 'gerencia_administrativa', type: 'string' },
            { name: 'departamento_administrativo', type: 'string' },
            { name: 'id_area', type: 'integer' },
            { name: 'area', type: 'string' },
            { name: 'id_ubicacion', type: 'integer' },
            { name: 'num_contrato', type: 'string' },
            { name: 'id_proceso', type: 'integer' },
            { name: 'proceso_codigo', type: 'string' },
            { name: 'nivelsalarial', type: 'string' },
            { name: 'cargo', type: 'string' },
            { name: 'sueldo', type: 'numeric' },
            { name: 'fecha_ini', type: 'date' },
            { name: 'fecha_incor', type: 'date' },
            { name: 'fecha_fin', type: 'date'},
            { name: 'fecha_baja', type: 'date' },
            { name: 'motivo_baja', type: 'string' },
            { name: 'observacion', type: 'string' },
        ],
        url: '/relaborales/list',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargarRegistrosDeRelacionesLaborales();
    function cargarRegistrosDeRelacionesLaborales(){
        var theme = prepareSimulator("grid");
        $("#jqxgrid").jqxGrid(
            {
                theme: theme,
                width: '100%',
                height: '100%',
                source: dataAdapter,
                sortable: true,
                altRows: true,
                groupable: true,
                columnsresize: true,
                pageable: true,
                pagerMode: 'advanced',
                showfilterrow: true,
                filterable: true,
                columns: [
                    {
                        text: 'Nro.', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 50,cellsalign:'center',align:'center'
                    },
                    {text: '', datafield: 'nuevo', width: 10,sortable:false,showfilterrow:false, filterable:false, columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if(sw==0||sw==-1)
                            {
                                //return "<div style='width: 100%'><a href='#'><img src='/images/add.png' style='margin-left: 25%' title='Nuevo Registro.'/></a></div>";
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-plus-square fa-2x text-info' title='Nuevo Registro.'/></i></div>";
                            }
                            else return "";
                        }
                    },
                    {text: '', datafield: 'editar', width: 10,sortable:false,showfilterrow:false, filterable:false, columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if(estado==2)
                            {
                                //return "<div style='width: 100%'><a href='#'><img src='/images/edit.png' style='margin-left: 25%' title='Modificar registro.'/></a></div>";
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-pencil-square fa-2x text-info' title='Modificar registro.'/></a></div>";
                            }
                            else return "";
                        }
                    },
                    {text: '', datafield: 'eliminar', width: 10,sortable:false,showfilterrow:false, filterable:false, columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var estado = dataRecord.estado;
                            if(estado==1)
                            {
                                //return "<div style='width: 100%'><a href='#'><img src='/images/del.png' style='margin-left: 25%' title='Dar de baja al registro.'/></a></div>";
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-minus-square fa-2x text-info' title='Dar de baja al registro.'/></i></div>";
                            }
                            else return "";
                        }
                    },
                    {text: '', datafield: 'ver', width: 10,sortable:false,showfilterrow:false, filterable:false, columntype: 'number',
                        cellsrenderer: function (rowline) {
                            ctrlrow = rowline
                            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', ctrlrow);
                            var sw = dataRecord.tiene_contrato_vigente;
                            if(sw>=0)
                            {
                                //return "<div style='width: 100%'><a href='#'><img src='/images/view.png' style='margin-left: 25%' title='Vista historial de registros.'/></a></div>";
                                return "<div style='width: 100%' align='center'><a href='#'><i class='fa fa-search fa-2x text-info' title='Vista Historial.'/></i></div>";
                            }
                            else return "";
                        }
                    },
                    { text: 'Ubicaci&oacute;n', filtertype: 'checkedlist', datafield: 'ubicacion', width: 150,cellsalign:'center',align:'center', hidden:true},
                    { text: 'Condici&oacute;n', filtertype: 'checkedlist', datafield: 'condicion', width: 150,align:'center', hidden:true},
                    { text: 'Estado', filtertype: 'checkedlist', datafield: 'estado_descripcion', width: 100,align:'center', hidden:false,cellclassname: cellclass},
                    { text: 'Nombres y Apellidos', columntype: 'textbox', filtertype: 'input', datafield: 'nombres', width: 215,align:'center' , hidden:false},
                    { text: 'CI', columntype: 'textbox', filtertype: 'input', datafield: 'ci', width: 90 ,cellsalign: 'center',align:'center', hidden:false},
                    { text: 'Exp', filtertype: 'checkedlist', datafield: 'expd', width: 40,cellsalign: 'center',align:'center', hidden:false},
                    { text: 'N/C', columntype: 'textbox', filtertype: 'input', datafield: 'num_complemento', width: 40,cellsalign: 'center',align:'center', hidden: true},
                    { text: 'Gerencia', filtertype: 'checkedlist', datafield: 'gerencia_administrativa', width: 220,align:'center', hidden:false},
                    { text: 'Departamento', filtertype: 'checkedlist', datafield: 'departamento_administrativo', width: 220,align:'center', hidden:true},
                    { text: '&Aacute;rea', filtertype: 'checkedlist', datafield: 'area', width: 220,align:'center', hidden:true},
                    { text: 'Proceso', filtertype: 'checkedlist', datafield: 'proceso_codigo', width: 220,cellsalign: 'center',align:'center', hidden:true},
                    { text: 'Nivel Salarial', filtertype: 'checkedlist', datafield: 'nivelsalarial', width: 220,align:'center', hidden:true},
                    { text: 'Cargo', columntype: 'textbox', filtertype: 'input', datafield: 'cargo', width: 215 ,align:'center', hidden:false},
                    { text: 'Haber', filtertype: 'checkedlist', datafield: 'sueldo', width: 100,cellsalign: 'right',align:'center', hidden:false},
                    { text: 'Fecha Inicio', datafield: 'fecha_ini', filtertype: 'range', width: 100, cellsalign: 'center', cellsformat: 'dd-MM-yyyy',align:'center', hidden:false},
                    { text: 'Fecha Incor.', datafield: 'fecha_incor', filtertype: 'range', width: 100, cellsalign: 'center', cellsformat: 'dd-MM-yyyy' ,align:'center', hidden:false},
                    { text: 'Fecha Fin', datafield: 'fecha_fin', filtertype: 'range', width: 100, cellsalign: 'center', cellsformat: 'dd-MM-yyyy' ,align:'center', hidden:true},
                    { text: 'Fecha Baja', datafield: 'fecha_baja', filtertype: 'range', width: 100, cellsalign: 'center', cellsformat: 'dd-MM-yyyy' ,align:'center', hidden:true},
                    { text: 'Motivo Baja', datafield: 'motivo_baja', width: 100 , hidden:true},
                    { text: 'Observacion', datafield: 'observacion', width: 100 , hidden:true},
                ]
            });
        $("#jqxgrid").on("cellclick", function (event) {
            var column = event.args.column;
            var rowindex = event.args.rowindex;
            var columnindex = event.args.columnindex;
            columnindex = parseInt(columnindex);
            newrow = rowindex;
            var offset = $("#jqxgrid").offset();
            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', newrow);
            if(dataRecord!=undefined){
                var id_relaboral =dataRecord.id_relaboral;
                $("#tr_cargo_seleccionado").html("");
                $("#tr_cargo_seleccionado_editar").html("");
                switch (columnindex) {
                    case 1: //Nuevo
                        /**
                         * Para el caso cuando la persona no tenga ninguna relación laboral vigente con la entidad se da la opción de registro de nueva relación laboral.
                         */
                        if (dataRecord.tiene_contrato_vigente == 0||dataRecord.tiene_contrato_vigente == -1) {
                            $('#btnBuscarCargo').click();
                            $('#jqxTabs').jqxTabs('enableAt', 1);
                            $('#jqxTabs').jqxTabs('disableAt', 2);
                            $('#jqxTabs').jqxTabs('disableAt', 3);
                            $('#jqxTabs').jqxTabs('next');
                            $("#hdnIdRelaboralEditar").val(dataRecord.id_relaboral);
                            $("#hdnIdPersonaSeleccionada").val(dataRecord.id_persona);
                            $("#NombreParaNuevoRegistro").html(dataRecord.nombres);
                            $("#CorreoPersonal").html("");
                            $("#hdnIdCondicionNuevaSeleccionada").val(0)
                            $("#divAreas").hide();
                            $("#divItems").hide();
                            $("#divFechasFin").hide();
                            $("#divNumContratos").hide();
                            $(".msjs-alert").hide();
                            $("#divProcesos").hide();
                            $("#helpErrorUbicaciones").html("");
                            $("#helpErrorProcesos").html("");
                            $("#helpErrorCategorias").html("");
                            $("#divUbicaciones").removeClass("has-error");
                            $("#divProcesos").removeClass("has-error");
                            $("#divCategorias").removeClass("has-error");
                            var rutaImagen = obtenerRutaFoto(dataRecord.ci,dataRecord.num_complemento);
                            $("#imgFotoPerfilNuevo").attr("src",rutaImagen);
                        }
                        break;
                    case 2: //Modificación
                        /**
                         * Para el caso cuando la persona tenga un registro de relación laboral en estado de proceso.
                         */
                        if (dataRecord.estado == 2) {
                            $('#jqxTabs').jqxTabs('enableAt', 0);
                            $('#jqxTabs').jqxTabs('disableAt', 1);
                            $('#jqxTabs').jqxTabs('enableAt', 2);
                            $('#jqxTabs').jqxTabs('disableAt', 3);
                            $('#jqxTabs').jqxTabs('disableAt', 4);
                            $('#jqxTabs').jqxTabs('next');
                            $("#hdnIdRelaboralEditar").val(id_relaboral);
                            $("#hdnIdPersonaSeleccionadaEditar").val(dataRecord.id_persona);
                            $("#NombreParaEditarRegistro").html(dataRecord.nombres);
                            $("#hdnIdCondicionEditableSeleccionada").val(dataRecord.id_condicion);
                            $("#hdnIdUbicacionEditar").val(dataRecord.id_ubicacion);
                            $("#hdnIdProcesoEditar").val(dataRecord.id_proceso);
                            $("#FechaIniEditar").jqxDateTimeInput({ value:dataRecord.fecha_ini,enableBrowserBoundsDetection: false, height: 24, formatString:'dd-MM-yyyy' });
                            $("#FechaIncorEditar").jqxDateTimeInput({ value:dataRecord.fecha_incor,enableBrowserBoundsDetection: false, height: 24, formatString:'dd-MM-yyyy' });
                            switch (dataRecord.condicion){
                                case 'PERMANENTE':$("#divFechasFinEditar").hide();break;
                                case 'EVENTUAL':
                                case 'CONSULTOR':
                                    $("#FechaFinEditar").jqxDateTimeInput({ value:dataRecord.fecha_fin,enableBrowserBoundsDetection: false, height: 24, formatString:'dd-MM-yyyy' });
                                    break;
                            }
                            $("#hdnFechaFinEditar").val(dataRecord.fecha_fin);
                            $("#txtNumContratoEditar").val(dataRecord.num_contrato);
                            $("#divItemsEditar").hide();
                            $("#divNumContratosEditar").hide();
                            $(".msjs-alert").hide();
                            $("#helpErrorUbicacionesEditar").html("");
                            $("#helpErrorProcesosEditar").html("");
                            $("#helpErrorCategoriasEditar").html("");
                            $("#helpErrorFechasIniEditar").html("");
                            $("#helpErrorFechasIncorEditar").html("");
                            $("#helpErrorFechasFinEditar").html("");
                            $("#divUbicacionesEditar").removeClass("has-error");
                            $("#divProcesosEditar").removeClass("has-error");
                            $("#divCategoriasEditar").removeClass("has-error");
                            $("#divAreas").hide();
                            $("#divFechasIniEditar").removeClass("has-error");
                            $("#divFechasIncorEditar").removeClass("has-error");
                            $("#divFechasFinEditar").removeClass("has-error");
                            $("#tr_cargo_seleccionado_editar").html("");
                            if(dataRecord.observacion!=null)$("#txtObservacionEditar").text(dataRecord.observacion);
                            else $("#txtObservacionEditar").text('');
                            cargarProcesosParaEditar(dataRecord.id_condicion,dataRecord.id_proceso);
                            cargarUbicacionesParaEditar(dataRecord.id_ubicacion);
                            agregarCargoSeleccionadoEnGrillaParaEditar(dataRecord.id_cargo,dataRecord.cargo_codigo,dataRecord.id_finpartida,dataRecord.finpartida,dataRecord.id_condicion,dataRecord.condicion,dataRecord.id_organigrama,dataRecord.gerencia_administrativa,dataRecord.departamento_administrativo,dataRecord.id_area,dataRecord.nivelsalarial,dataRecord.cargo,dataRecord.sueldo);
                            var rutaImagen = obtenerRutaFoto(dataRecord.ci,dataRecord.num_complemento);
                            $("#imgFotoPerfilEditar").attr("src",rutaImagen);
                        }
                        break;
                    case 3: //Baja
                        if (dataRecord.estado == 1) {
                            $('#jqxTabs').jqxTabs('enableAt', 0);
                            $('#jqxTabs').jqxTabs('disableAt', 1);
                            $('#jqxTabs').jqxTabs('disableAt', 2);
                            $('#jqxTabs').jqxTabs('enableAt', 3);
                            $('#jqxTabs').jqxTabs('disableAt', 4);
                            /**
                             * Trasladamos el item seleccionado al que corresponde, el de bajas.
                             */
                            $('#jqxTabs').jqxTabs({ selectedItem: 3 });

                            //alert(dataRecord.fecha_incor.toString());
                            $("#hdnIdRelaboralBaja").val(id_relaboral);
                            $("#NombreParaBajaRegistro").html(dataRecord.nombres);
                            $("#hdnIdCondicionSeleccionadaBaja").val(dataRecord.id_condicion);
                            $("#txtFechaIniBaja").jqxDateTimeInput({ disabled: true,value:dataRecord.fecha_ini,enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
                            $("#txtFechaIncorBaja").jqxDateTimeInput({ disabled: true,value:dataRecord.fecha_incor,enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
                            $("#txtFechaFinBaja").jqxDateTimeInput({ disabled: true,value:dataRecord.fecha_fin,enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
                            $(".msjs-alert").hide();
                            $("#divFechasRenBaja").hide();
                            $("#divFechasAceptaRenBaja").hide();
                            $("#divFechasAgraServBaja").hide();
                            $("#txtObservacionBaja").val(dataRecord.observacion);
                            $("#divMsjeError").hide();
                            $("#tr_cargo_seleccionado_baja").html("");
                            $("#lstMotivosBajas").focus();
                            $("#hdnFechaRenBaja").val(0);
                            $("#hdnFechaAceptaRenBaja").val(0);
                            $("#hdnFechaAgraServBaja").val(0);
                            agregarCargoSeleccionadoEnGrillaParaBaja(dataRecord.id_cargo,dataRecord.cargo_codigo,dataRecord.id_finpartida,dataRecord.finpartida,dataRecord.id_condicion,dataRecord.condicion,dataRecord.id_organigrama,dataRecord.gerencia_administrativa,dataRecord.departamento_administrativo,dataRecord.nivelsalarial,dataRecord.cargo,dataRecord.sueldo);
                            cargarMotivosBajas(0,dataRecord.id_condicion);
                            //habilitarCamposParaBajaRegistroDeRelacionLaboral(dataRecord.id_organigrama,dataRecord.id_fin_partida,dataRecord.id_condicion);
                            var rutaImagen = obtenerRutaFoto(dataRecord.ci,dataRecord.num_complemento);
                            $("#imgFotoPerfilBaja").attr("src",rutaImagen);
                        }
                        break;
                    case 4://Vista
                        $(".msjs-alert").hide();
                        $("#hdnIdPersonaHistorial").val(dataRecord.id_persona);
                        if (dataRecord.tiene_contrato_vigente >= 0) {
                            $('#jqxTabs').jqxTabs('enableAt', 0);
                            $('#jqxTabs').jqxTabs('disableAt', 1);
                            $('#jqxTabs').jqxTabs('disableAt', 2);
                            $('#jqxTabs').jqxTabs('disableAt', 3);
                            $('#jqxTabs').jqxTabs('enableAt', 4);
                            /**
                             * Trasladamos el item seleccionado al que corresponde, el de vistas.
                             */
                            $('#jqxTabs').jqxTabs({ selectedItem: 4 });
                            // Create jqxTabs.
                            $('#tabFichaPersonal').jqxTabs({
                                theme: 'oasis',
                                width: '100%',
                                height: '100%',
                                position: 'top'});
                            // Focus jqxTabs.
                            //$('#tabFichaPersonal').jqxTabs('focus');
                            $('#tabFichaPersonal').jqxTabs({ selectedItem: 0 });
                            $("#ddNombres").html(dataRecord.nombres);
                            var rutaImagen = obtenerRutaFoto(dataRecord.ci,dataRecord.num_complemento);
                            $("#imgFotoPerfilContactoPer").attr("src",rutaImagen);
                            $("#imgFotoPerfilContactoInst").attr("src",rutaImagen);
                            $("#imgFotoPerfil").attr("src",rutaImagen);
                            cargarPersonasContactos(dataRecord.id_persona);
                            $("#hdnIdRelaboralVista").val(id_relaboral);
                            $("#hdnSwPrimeraVistaHistorial").val(0);
                            cargarGestionesHistorialRelaboral(dataRecord.id_persona);
                            /**
                             * Para la primera cargada el valor para el parámetro gestión es 0 debido a que mostrará el historial completo.
                             * Para el valor del parámetro sw el valor es 1 porque se desea que se limpie lo que haya y se cargue algo nuevo
                             */
                            cargarHistorialRelacionLaboral(dataRecord.id_persona,0,1);
                            $("#divContent_"+dataRecord.id_relaboral).focus().select();
                        }
                        break;
                }

            }else return true;

        });
        var listSource = [
            { label: 'Ubicaci&oacute;n', value: 'ubicacion', checked: false },
            { label: 'Condici&oacute;n', value: 'condicion', checked: false },
            { label: 'Estado', value: 'estado_descripcion', checked: true },
            { label: 'Nombres y Apellidos', value: 'nombres', checked: true },
            { label: 'CI', value: 'ci', checked: true},
            { label: 'Exp', value: 'expd', checked: true},
            { label: 'N/C', value: 'num_complemento', checked: false },
            { label: 'Gerencia', value: 'gerencia_administrativa', checked: true },
            { label: 'Departamento', value: 'departamento_administrativo', checked: false },
            { label: '&Aacute;rea', value: 'area', checked: false },
            { label: 'proceso', value: 'proceso_codigo', checked: false },
            { label: 'Nivel Salarial', value: 'nivelsalarial', checked: false },
            { label: 'Cargo', value: 'cargo', checked: true },
            { label: 'Haber', value: 'sueldo', checked: true },
            { label: 'Fecha Inicio', value: 'fecha_ini', checked: true },
            { label: 'Fecha Incor.', value: 'fecha_incor', checked: true },
            { label: 'Fecha Fin', value: 'fecha_fin', checked: false },
            { label: 'Fecha Baja', value: 'fecha_baja', checked: false },
            { label: 'Motivo Baja', value: 'motivo_baja', checked: false },
            { label: 'Observacion', value: 'observacion', checked: false },
        ];
        $("#jqxlistbox").jqxListBox({ source: listSource, width: "100%", height: 100,  checkboxes: true });
        $("#jqxlistbox").on('checkChange', function (event) {
            $("#jqxgrid").jqxGrid('beginupdate');
            if (event.args.checked) {
                $("#jqxgrid").jqxGrid('showcolumn', event.args.value);
            }
            else {
                $("#jqxgrid").jqxGrid('hidecolumn', event.args.value);
            }
            $("#jqxgrid").jqxGrid('endupdate');
        });
    }
}
/*
 * Función para controlar la ejecución del evento esc con el teclado.
 */
function OperaEvento(evento) {
    if ((evento.type == "keyup" || evento.type == "keydown") && evento.which == "27") {
        $('#jqxTabs').jqxTabs('enableAt', 0);
        $('#jqxTabs').jqxTabs('disableAt', 1);
        $('#jqxTabs').jqxTabs('disableAt', 2);
        $('#jqxTabs').jqxTabs('disableAt', 3);
        $('#jqxTabs').jqxTabs('disableAt', 4);
        $("#popupWindowCargo").jqxWindow('close');
    }
}
/**
 * Función para convertir un texto con el formato dd-MM-yyyy al formato MM/dd/yyyy
 * @param date Cadena con la fecha
 * @param sep Separador
 * @returns {number}
 */
function procesaTextoAFecha(date,sep){
    var parts = date.split(sep);
    var date = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    return date.getTime();
}
/**
 *
 * Función para la obtención de la ruta en la cual reside la fotografía correspondiente de la persona.
 * @param numDocumento Número de documento, comunmente el número de CI.
 * @param numComplemento Número de complemento.
 * @returns {string} Ruta de ubicación de la fotografía a mostrarse.
 */
function obtenerRutaFoto(numDocumento,numComplemento){
    var resultado = "/images/perfil-profesional.jpg";
    if(numDocumento!=""){
        $.ajax({
            url:'/relaborales/obtenerrutafoto/',
            type:"POST",
            datatype: 'json',
            async:false,
            cache:false,
            data:{ci:numDocumento,num_complemento:numComplemento },
            success: function(data) {
                var res = jQuery.parseJSON(data);
                if(res.result==1){
                    resultado = res.ruta;
                }
            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }
    return resultado;
}
/*
    Función anónima para la aplicación de clases a celdas en particular dentro la grilla.
 */
var cellclass = function (row, columnfield, value) {
    if (value == 'ACTIVO') {
        return 'verde';
    }
    else if (value == 'EN PROCESO') {
        return 'amarillo';
    }
    else if(value == 'PASIVO'){
        return 'rojo';
    }
    else return ''
}