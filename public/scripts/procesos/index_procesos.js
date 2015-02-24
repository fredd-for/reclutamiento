
$(document).ready(function () {
    /*Combo box organigramas*/
    var sourceOrg =
            {
                datatype: "json",
                datafields: [
                    {name: 'id'},
                    {name: 'unidad_administrativa'},
                    {name: 'sigla'},
                ],
                url: '/cargos/listorganigrama',
                cache: false,
                async: false
            };
    var dataAdapterOrg = new $.jqx.dataAdapter(sourceOrg);
    /*
     $("#organigrama_sel").jqxComboBox(
     {
     source: dataAdapterOrg,
     width: 450,
     height: 25,
     promptText: '(Seleccionar)',
     displayMember: 'unidad_administrativa',
     valueMember: 'id'
     }); 
     
     /*Combo box depende de*/
    /*  var sourceDep =
     {
     datatype: "json",
     datafields: [
     { name: 'organigrama'},
     { name: 'id'},
     { name: 'nombre'},
     { name: 'cargo'},
     ],
     url: '/cargos/listPersonal',
     cache: false,
     async: false
     };
     var dataAdapterDep = new $.jqx.dataAdapter(sourceDep);
     
     $("#depende_id").jqxComboBox(
     {
     //source: dataAdapterDep,
     width: 450,
     height: 25,
     disabled: false ,
     promptText: '(Seleccionar)',
     displayMember: 'nombre',
     valueMember: 'cargo',
     autoDropDownHeight: true
     }); 
     
     /*Filtro segun organigrama a cargos*/

    $("#organigrama_sel").bind('select', function (event)
    {
        if (event.args)
        {
            $("#depende_id").jqxComboBox({disabled: false, selectedIndex: -1});
            var value = event.args.item.value;
            sourceDep.data = {organigrama_id: value};
            dataAdapterDep = new $.jqx.dataAdapter(sourceDep);
            $("#depende_id").jqxComboBox({source: dataAdapterDep});
        }
    });

    $("#depende_id").bind('select', function (event)
    {
        if (event.args)
        {
            var value = event.args.item.value;
            $("#comision_nombre").val(event.args.item.value);
            $("#comision_cargo").val(event.args.item.label);

        }
    });


//function cargar(){
    var source =
            {
                datatype: "json",
                datafields: [
                    {name: 'nro', type: 'number'},
                    {name: 'id', type: 'number'},
                    {name: 'denominacion', type: 'string'},
                    {name: 'codigo_convocatoria', type: 'string'},
                    {name: 'normativamod_id', type: 'number'},
                    {name: 'fecha_publ'},
                    {name: 'fecha_recep'},
                    {name: 'fecha_concl'}
                ],
                id: 'id',
                url: '/procesoscontrataciones/list',
                cache: false,
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);

    var sourceSeg1 =
            {
                datafields: [
                    {name: 'nro', type: 'number'},
                    {name: 'id', type: 'number'},
                    {name: 'unidad_administrativa', type: 'string'},
                    {name: 'proceso_contratacion_id', type: 'number'},
                    {name: 'codigo', type: 'string'},
                    {name: 'cargo', type: 'string'},
                    {name: 'sueldo', type: 'number'},
                    {name: 'estado', type: 'number'}
                ],
                //root: "Orders",
                //record: "Order",
                datatype: "json",
                url: '/procesoscontrataciones/listseguimiento',
                async: false
            };

    var dataAdapterSeg = new $.jqx.dataAdapter(sourceSeg1, {autoBind: true});
    orders = dataAdapterSeg.records;
    var nestedGrids = new Array();
    // create nested grid.
    var initrowdetails = function (index, parentElement, gridElement, record) {
        var id = record.uid.toString();
        //alert(id);
        var grid = $($(parentElement).children()[0]);
        nestedGrids[index] = grid;
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = id;
        var filtercondition = 'equal';
        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        // fill the orders depending on the id.
        var ordersbyid = [];
        for (var m = 0; m < orders.length; m++) {
            var result = filter.evaluate(orders[m]["proceso_contratacion_id"]);
            if (result)
                ordersbyid.push(orders[m]);
        }

        var sourceSeg = {datafields: [
                {name: 'nro', type: 'number'},
                {name: 'id', type: 'number'},
                {name: 'unidad_administrativa', type: 'string'},
                {name: 'proceso_contratacion_id', type: 'number'},
                {name: 'codigo', type: 'string'},
                {name: 'cargo', type: 'string'},
                {name: 'sueldo', type: 'number'},
                {name: 'estado', type: 'number'}
            ],
            id: 'proceso_contratacion_id',
            localdata: ordersbyid
        }
        var nestedGridAdapter = new $.jqx.dataAdapter(sourceSeg);

        if (grid != null) {
            grid.jqxGrid({
                source: nestedGridAdapter,
                width: '95%',
                height: 150,
                columns: [
                    //{ text: 'Nro', datafield: 'id', width: '5%' },
                    {text: 'Item / Codigo Cargo', datafield: 'codigo', width: '7%'},
                    {text: 'Unidad Administrativa', datafield: 'unidad_administrativa', width: '35%'},
                    {text: 'Cargo', datafield: 'cargo', width: '35%'},
                    {text: 'Sueldo', datafield: 'sueldo', width: '5%'},
                    {text: 'Estado', datafield: 'estado', width: '8%'},
                    {text: 'Seguimiento', datafield: 'Seguimiento', width: '10%', sortable: false, columntype: 'button', cellsrenderer: function () {
                            return "Seguimiento";
                        }, buttonclick: function (row) {
                            editrow = row;
                            var dataRecord = grid.jqxGrid('getrowdata', editrow);
                            //alert (dataRecord.id);
                            var v = $.ajax({
                                url: '/procesoscontrataciones/getSeguimiento/',
                                type: 'POST',
                                datatype: 'json',
                                data: {id: dataRecord.id},
                                success: function (data) {
                                    datos = JSON.parse(data);//alert(datos.id_seguimiento); 
                                    $("#id_seguimiento").val(datos.id_seguimiento);
                                    $("#codigo_convocatoria_s").text(datos.codigo_convocatoria);
                                    $("#cargo_s").text(dataRecord.cargo);
                                    $("#item_s").text(dataRecord.codigo);
                                    $("#denominacion_s").text(datos.denominacion);
                                    $("#usuario_sol").val(datos.usuario_sol);
                                    $("#cert_presupuestaria").val(datos.cert_presupuestaria);
                                    $("#seguimiento_estado_id").val(datos.seguimiento_estado_id);
                                    $("#organigrama_id").val(datos.organigrama_id);

                                    //alert(datos.usuario_sol);
                                    var fecha1 = null;
                                    if (datos.fecha_sol != null) {
                                        fecha1 = new Date(datos.fecha_sol);
                                        fecha1.setTime(fecha1.getTime() + 1 * 24 * 60 * 60 * 1000);
                                    }
                                    ;
                                    var fecha2 = null;
                                    if (datos.fecha_cert_pre != null) {
                                        fecha2 = new Date(datos.fecha_cert_pre);
                                        fecha2.setTime(fecha2.getTime() + 1 * 24 * 60 * 60 * 1000);
                                    }
                                    ;
                                    var fecha3 = null;
                                    if (datos.fecha_apr_mae != null) {
                                        fecha3 = new Date(datos.fecha_apr_mae);
                                        fecha3.setTime(fecha3.getTime() + 1 * 24 * 60 * 60 * 1000);
                                    }
                                    ;

                                    $('#fecha_sol').jqxDateTimeInput('setDate', fecha1);
                                    //$("#fecha_cert_pre").jqxDateTimeInput({ value:fecha2,enableBrowserBoundsDetection: false, width: '100%', height: 24, formatString:'dd-MM-yyyy' }); 
                                    $('#fecha_cert_pre').jqxDateTimeInput('setDate', fecha2);
                                    $('#fecha_apr_mae').jqxDateTimeInput('setDate', fecha3);
                                }, //mostramos el error
                                error: function () {
                                    alert('Se ha producido un error Inesperado');
                                }
                            });

                            lista_adjudicados(dataRecord.id);
                            lista_comision(dataRecord.id);
                            lista_criterios(dataRecord.id);

                        }
                    }
                ]
            });
        }
    }

    var renderer = function (row, column, value) {
        return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + value + '</span>';
    }


    $("#jqxgrid").jqxGrid({
        width: '100%',
        source: source,
        rowdetails: true,
        rowsheight: 35,
        initrowdetails: initrowdetails,
        rowdetailstemplate: {rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true},
        ready: function () {
            $("#jqxgrid").jqxGrid('showrowdetails', 0);
        },
        sortable: true,
        altRows: true,
        pageable: true,
        pagerMode: 'advanced',
        theme: 'custom',
        showfilterrow: true,
        filterable: true,
        columns: [
            
            {text: 'Denominaión', datafield: 'denominacion', filtertype: 'input', width: '25%'},
            {text: 'Codigo Convocatoria', datafield: 'codigo_convocatoria', filtertype: 'input', width: '15%'},
            {text: 'Fecha Publicación', datafield: 'fecha_publ', filtertype: 'range', width: '15%'},
            {text: 'Fecha Recepeción', datafield: 'fecha_recep', filtertype: 'range', width: '15%'},
            {text: 'Fecha Conclusión', datafield: 'fecha_concl', filtertype: 'range', width: '15%'},
            {text: 'Editar', datafield: 'Editar', width: '5%', sortable: false, columntype: 'button', cellsrenderer: function () {
                    return "Editar";
                }, buttonclick: function (row) {
                    // open the popup window when the user clicks a button.
                    editrow = row;
                    var offset = $("#jqxgrid").offset();
                    $("#popupWindow").jqxWindow({position: {x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60}});

                    // get the clicked row's data and initialize the input fields.
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                    $("#titulo").text("Editar");
                    $("#id").val(dataRecord.id);
                    $("#normativamod_id").val(dataRecord.normativamod_id);
                    $("#codigo_convocatoria2").val(dataRecord.codigo_convocatoria);

                    var fecha = dataRecord.fecha_publ;
                    fecha = fecha.replace("-", "/").replace("-", "/");
                    fecha = new Date(fecha);
                    fecha.setDate(fecha.getDate());
                    $("#fecha_publ").jqxDateTimeInput('setDate', fecha);

                    var fecha = dataRecord.fecha_recep;
                    fecha = fecha.replace("-", "/").replace("-", "/");
                    fecha = new Date(fecha);
                    fecha.setDate(fecha.getDate());
                    $("#fecha_recep").jqxDateTimeInput('setDate', fecha);

                    var fecha = dataRecord.fecha_concl;
                    fecha = fecha.replace("-", "/").replace("-", "/");
                    fecha = new Date(fecha);
                    fecha.setDate(fecha.getDate());
                    $("#fecha_concl").jqxDateTimeInput('setDate', fecha);

                    // show the popup window.
                    $("#popupWindow").jqxWindow('open');
                }
            },
            {text: 'Eliminar', datafield: 'Eliminar', width: '5%', sortable: false, columntype: 'button', cellsrenderer: function () {
                    return "Eliminar";
                }, buttonclick: function (row) {
                    editrow = row;
                    var offset = $("#jqxgrid").offset();
                    $("#popupWindow_delete").jqxWindow({position: {x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60}});

                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                    $("#id").val(dataRecord.id);
                    $("#popupWindow_delete").jqxWindow('open');
                }
            }
        ]
    });


    /********************Funciones de la primera grilla************************/
// initialize the popup window and buttons.
    $("#popupWindow").jqxWindow({
        width: 850, height: 500, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });
    $("#popupWindow_delete").jqxWindow({
        width: 850, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#popupWindow_adjudicado").jqxWindow({
        width: 600, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#popupWindow_deleteAdjudicado").jqxWindow({
        width: 600, height: 100, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#popupWindow_comision").jqxWindow({
        width: 600, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#popupWindow_deleteComision").jqxWindow({
        width: 700, height: 100, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#Save").click(function () {
        var fecha_publ = $('#fecha_publ').jqxDateTimeInput('getDate');
        var fecha_recep = $('#fecha_recep').jqxDateTimeInput('getDate');
        var fecha_concl = $('#fecha_concl').jqxDateTimeInput('getDate');
        var v = $.ajax({
            url: '../../procesoscontrataciones/save/',
            type: 'POST',
            datatype: 'json',
            data: {id: $("#id").val(), normativamod_id: $("#normativamod_id").val(), codigo_convocatoria: $("#codigo_convocatoria2").val(), fecha_publ: fecha_publ, fecha_recep: fecha_recep, fecha_concl: fecha_concl},
            success: function (data) {
                cargar(); //alert(data); 
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
        $("#popupWindow").jqxWindow('hide');
        // }
    });

    $("#add").click(function () {
        location.href = "/procesoscontrataciones/add/";
    });

    $("#Eliminar").click(function () {
        //alert($("#id").val());
        if (editrow >= 0) {
            var v = $.ajax({
                url: '/procesoscontrataciones/delete/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val()},
                success: function (data) {
                    location.href = "/procesoscontrataciones/";//cargar(); //alert(data); 
                }, //mostramos el error
                error: function () {
                    alert('Se ha producido un error Inesperado');
                }
            });
            //$('#jqxgrid').jqxGrid();
            $("#popupWindow_delete").jqxWindow('hide');
        }
    });

    $("#normativamod_id, #codigo_convocatoria").change(function () {
        var element = $("#normativamod_id").find('option:selected');
        var modalidad = element.attr("modalidad");
        var codigo_convocatoria = $("#codigo_convocatoria").val();
        var fecha = new Date();
        var anio = fecha.getFullYear();
        $("#codigo_convocatoria2").val(modalidad + "-" + codigo_convocatoria + "/" + anio);
        //$('#setMyTag').val(myTag); 
    });

    $("#fecha_publ").jqxDateTimeInput({width: '250px', height: '25px', formatString: 'yyyy-MM-dd'});
    $("#fecha_recep").jqxDateTimeInput({width: '250px', height: '25px', formatString: 'yyyy-MM-dd'});
    $("#fecha_concl").jqxDateTimeInput({width: '250px', height: '25px', formatString: 'yyyy-MM-dd'});
    $("#fecha_sol").jqxDateTimeInput({width: '100%', height: '25px', formatString: 'dd-MM-yyyy', value: null});
    $("#fecha_cert_pre").jqxDateTimeInput({width: '100%', height: '25px', formatString: 'dd-MM-yyyy', value: null});
    $("#fecha_apr_mae").jqxDateTimeInput({width: '100%', height: '25px', formatString: 'dd-MM-yyyy', value: null});


    /*************Scrip para seguimiengo***********************************/
    $("#guardar_hito").click(function () {
        if ($("#id_seguimiento").val() == "") {
            alert("INFO: En la tabla PROCESOS CONTRATACION debe seleccionar el boton seguimiento, para cargar datos.")
        } else {
            var id_seguimiento = $("#id_seguimiento").val();
            var organigrama_id = $("#organigrama_id").val();
            var usuario_sol = $("#usuario_sol").val();
            var cert_presupuestaria = $("#cert_presupuestaria").val();
            var seguimiento_estado_id = $("#seguimiento_estado_id").val();
            var fecha_sol = $('#fecha_sol').jqxDateTimeInput('getDate');
            var fecha_cert_pre = $('#fecha_cert_pre').jqxDateTimeInput('getDate');
            var fecha_apr_mae = $('#fecha_apr_mae').jqxDateTimeInput('getDate');
            //alert(fecha_apr_mae);
            var v = $.ajax({
                url: '/procesoscontrataciones/editSeguimiento/',
                type: 'POST',
                datatype: 'json',
                data: {id: id_seguimiento, organigrama_id: organigrama_id, usuario_sol: usuario_sol, cert_presupuestaria: cert_presupuestaria, seguimiento_estado_id: seguimiento_estado_id, fecha_sol: fecha_sol, fecha_cert_pre: fecha_cert_pre, fecha_apr_mae: fecha_apr_mae},
                success: function (data) {
                    alert(data);
                }, //mostramos el error
                error: function () {
                    alert('Se ha producido un error Inesperado');
                }

            });
        }
    });

    /**********Lista de adjudicados***************/

    function lista_adjudicados(id_seg) {
        //alert(id_seg);
        var v = $.ajax({
            url: '/procesoscontrataciones/listAdjudicado/',
            type: 'POST',
            datatype: 'json',
            complete: function () {
                $(".delete_adjudicado").click(function () {
                    var id_adjudicado = $(this).attr("adjudicado");
                    var nombre = $(this).attr("nombre");
                    $("#id_adjudicado").val(id_adjudicado);
                    $("#nombre_delete").text("Esta seguro de eliminar a : " + nombre);
                    var offset = $("#add_adjudicado").offset();
                    $("#popupWindow_deleteAdjudicado").jqxWindow({position: {x: parseInt(offset.left) - 30, y: parseInt(offset.top) - 60}});
                    $("#popupWindow_deleteAdjudicado").jqxWindow('open');
                });
            },
            data: {id_seguimiento: id_seg},
            success: function (data) {
                $("#li_adjudicados").html(data);

            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }

        });
    }



    $("#add_adjudicado").click(function () {
        if ($("#id_seguimiento").val() == "") {
            alert("INFO: En la tabla PROCESOS CONTRATACION debe seleccionar el boton seguimiento, para cargar datos.")
        } else {
            var offset = $("#add_adjudicado").offset();
            $("#popupWindow_adjudicado").jqxWindow({position: {x: parseInt(offset.left) - 30, y: parseInt(offset.top) - 60}});
            $("#popupWindow_adjudicado").jqxWindow('open');
        }
    });

    $("#Save_adjudicado").click(function () {
        var v = $.ajax({
            url: '/procesoscontrataciones/saveAdjudicado/',
            type: 'POST',
            datatype: 'json',
            data: {id_seguimiento: $("#id_seguimiento").val(), nombre: $("#nombre").val(), ci: $("#ci").val()},
            success: function (data) {
                alert(data);
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
        $("#popupWindow_adjudicado").jqxWindow('hide');
        lista_adjudicados($("#id_seguimiento").val());              // }
    });

    $("#EliminarAdjudicado").click(function () {
        if ($("#id_adjudicado").val() > 0) {
            var v = $.ajax({
                url: '/procesoscontrataciones/deleteAdjudicado/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id_adjudicado").val()},
                success: function (data) {
                    alert(data);
                    lista_adjudicados($("#id_seguimiento").val());
                }, //mostramos el error
                error: function () {
                    alert('Se ha producido un error Inesperado');
                }
            });
            //$('#jqxgrid').jqxGrid();
            $("#popupWindow_deleteAdjudicado").jqxWindow('hide');
        }
    });
    /*************************************************/

    /***********Comision de calificacion****************/
    function lista_comision(id_seg) {
        //alert(id_seg);
        var v = $.ajax({
            url: '/procesoscontrataciones/listComision/',
            type: 'POST',
            datatype: 'json',
            complete: function () {
                $(".delete_comision").click(function () {
                    var id_comision = $(this).attr("comision");
                    //alert(id_comision);
                    var nombre = $(this).attr("nombre");
                    $("#id_comision").val(id_comision);
                    $("#nombre_delete_comision").text("Esta seguro de eliminar a : " + nombre);
                    var offset = $("#add_comision").offset();
                    $("#popupWindow_deleteComision").jqxWindow({position: {x: parseInt(offset.left) - 30, y: parseInt(offset.top) - 60}});
                    $("#popupWindow_deleteComision").jqxWindow('open');
                });
            },
            data: {id_seguimiento: id_seg},
            success: function (data) {
                $("#li_comision").html(data);

            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }

        });
    }

    $("#add_comision").click(function () {
        if ($("#id_seguimiento").val() == "") {
            alert("INFO: En la tabla PROCESOS CONTRATACION debe seleccionar el boton seguimiento, para cargar datos.")
        } else {
            var offset = $("#add_comision").offset();
            $("#popupWindow_comision").jqxWindow({position: {x: parseInt(offset.left) - 30, y: parseInt(offset.top) - 60}});
            $("#popupWindow_comision").jqxWindow('open');
        }
    });

    $("#Save_comision").click(function () {
        var v = $.ajax({
            url: '/procesoscontrataciones/saveComision/',
            type: 'POST',
            datatype: 'json',
            data: {id_seguimiento: $("#id_seguimiento").val(), nombre: $("#comision_nombre").val(), cargo: $("#comision_cargo").val()},
            success: function (data) {
                alert(data);
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
        $("#popupWindow_comision").jqxWindow('hide');
        lista_comision($("#id_seguimiento").val());              // }
    });

    $("#EliminarComision").click(function () {
        if ($("#id_comision").val() > 0) {
            var v = $.ajax({
                url: '/procesoscontrataciones/deleteComision/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id_comision").val()},
                success: function (data) {
                    alert(data);
                    lista_comision($("#id_seguimiento").val());
                }, //mostramos el error
                error: function () {
                    alert('Se ha producido un error Inesperado');
                }
            });
            //$('#jqxgrid').jqxGrid();
            $("#popupWindow_deleteComision").jqxWindow('hide');
        }
    });

    /***************************************/

    /***********Criterios de calificacion****************/
    function lista_criterios(id_seg) {

        var v = $.ajax({
            url: '/procesoscontrataciones/getPerfilCargo/',
            type: 'POST',
            datatype: 'json',
            data: {id_seguimiento: id_seg},
            success: function (data) {
                datos = JSON.parse(data);//alert(datos); 
                $("#formacion_academica_text").text(datos.formacion_academica);
                $("#exp_general_lic_text").text('A nivel Licenciatura ' + ' ' + datos.exp_general_lic);
                $("#exp_general_tec_text").text('A nivel tecnico ' + ' ' + datos.exp_general_tec);
                $("#exp_profesional_lic_text").text('A nivel Licenciatura ' + ' ' + datos.exp_profesional_lic);
                $("#exp_profesional_tec_text").text('A nivel tecnico ' + ' ' + datos.exp_profesional_tec);
                $("#exp_relacionado_lic_text").text('A nivel Licenciatura ' + ' ' + datos.exp_relacionado_lic);
                $("#exp_relacionado_tec_text").text('A nivel tecnico ' + ' ' + datos.exp_relacionado_tec);

            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }

        });
    }



});