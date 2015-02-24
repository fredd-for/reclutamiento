
$(document).ready(function() {
    $('#codigo_nivel').change('select', function(event) {
        var v = $.ajax({
            url: '/cargos/getSueldo/',
            type: 'POST',
            datatype: 'json',
            data: {id: $('#codigo_nivel').val()},
            success: function(data) {
                $("#sueldotxt").text(data);
            }, //mostramos el error
            error: function() {
                alert('Se ha producido un error Inesperado');
            }
        });
    });
    cargar();
    function cargar() {
        var source =
                {
                    datatype: "json",
                    datafields: [
                        {name: 'id', type: 'number'},
                        {name: 'unidad_administrativa', type: 'string'},
                        {name: 'organigrama_id', type: 'string'},
                        {name: 'depende_id', type: 'number'},
                        {name: 'codigo_nivel', type: 'string'},
                        {name: 'denominacion', type: 'string'},
                        {name: 'codigo', type: 'string'},
                        {name: 'cargo', type: 'string'},
                        {name: 'sueldo'},
                        {name: 'fin_partida_id'},
                        {name: 'estado', type: 'string'},
                        {name: 'condicion', type: 'string'},
                        {name: 'partida', type: 'number'},
                        {name: 'fuente_codigo', type: 'number'},
                        {name: 'fuente', type: 'string'},
                        {name: 'organismo_codigo', type: 'number'},
                        {name: 'organismo', type: 'string'}
                    ],
                    url: '/cargos/list',
                    cache: false
                };

        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#jqxgrid").jqxGrid({
            width: '100%',
            height:300,
            source: dataAdapter,
            sortable: true,
            altRows: true,
            theme: 'custom',
            //groupable: true,
            columnsresize: true,
            pageable: true,
            pagerMode: 'advanced',
            showfilterrow: true,
            filterable: true,
            //showtoolbar: true,
            autorowheight: true,
            columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function(row, column, value) {
                        return "<div style='margin:3px;'>" + (value + 1) + "</div>";
                    }
                },
                {text: 'Nro', datafield: 'id', filtertype: 'input', width: '5%', hidden: true},
                {text: 'Organigrama', datafield: 'unidad_administrativa', filtertype: 'input', width: '20%'},
                {text: 'Denominacion', datafield: 'denominacion', filtertype: 'input', width: '15%'},
                {text: 'Item', datafield: 'codigo', filtertype: 'input', width: '5%'},
                {text: 'Cargo', datafield: 'cargo', filtertype: 'input', width: '30%'},
                {text: 'Salario Mensual', datafield: 'sueldo', filtertype: 'number', width: '5%', cellsalign: 'right', align: 'right'},
                {text: 'Estado', datafield: 'estado', filtertype: 'checkedlist', width: '7%'},
                {text: 'Tipo Cargo', datafield: 'condicion', filtertype: 'checkedlist', width: '5%'},
                {text: 'Partida', datafield: 'partida', filtertype: 'number', width: '5%'},
                {text: 'Fuente Codigo', datafield: 'fuente_codigo', filtertype: 'number', width: '5%'},
                {text: 'Fuente', datafield: 'fuente', filtertype: 'input', width: '10%', hidden: true},
                {text: 'Organismo Codigo', datafield: 'organismo_codigo', filtertype: 'number', width: '5%'},
                {text: 'Organismo', datafield: 'organismo', filtertype: 'input', width: '10%', hidden: true},
            ]
        });

    }
    $("#jqxgrid").bind('rowselect', function(event) {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', event.args.rowindex);
        //alert(dataRecord.estado);
        $("#cargo_id_pac").val(dataRecord.id);
        $("#estado_cargo").val(dataRecord.estado);
        $("#organigrama_pac").text(dataRecord.unidad_administrativa);
        $("#item_pac").text(dataRecord.codigo);
        $("#cargo_pac").text(dataRecord.cargo);
        $("#sueldo_pac").text(dataRecord.sueldo);
        $("#formacion_requerida").text(dataRecord.formacion_requerida);


        /*****Edita cargo*******/
        $("#id").val(dataRecord.id);
        $("#organigrama_id").val(dataRecord.organigrama_id);
        $("#fin_partida_id").val(dataRecord.fin_partida_id);
        dependencia();
        $("#depende_id").val(dataRecord.depende_id);
        $("#codigo_nivel").val(dataRecord.codigo_nivel);
        $("#codigo").val(dataRecord.codigo);
        $("#cargo").val(dataRecord.cargo);
        $("#formacion_requerida").val(dataRecord.formacion_requerida);
        $("#sueldotxt").text(dataRecord.sueldo);

        /**********************/
    });
    $("#add").click(function() {
        $("#titulo").text("Adicionar");
        $("#id").val("");
//$("[type=radio][name=cargo_estado_id]:checked").removeAttr("checked");
        $("#codigo").val("");
        $("#organigrama_id").val("");
        $("#depende_id").val("");
        $("#fin_partida_id").val("");
        $("#codigo_nivel").val("");
        $("#cargo").val("");
        $("#formacion_requerida").val("");
        $("#sueldotxt").text("");
        //$('input[name=cargo_estado_id][value="1"]').prop('checked', true);
        // $("#popupWindow").jqxWindow('open');
        $('#myModal').modal('show');
    });

    $("#edit").click(function() {
        if ($("#id").val() != "") {
            $("#titulo").text("Editar");
            $('#myModal').modal('show');
        } else {
            bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
        }
    });

    $("#delete").click(function() {
        if ($("#id").val() != "") {
            bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
                if (result == true) {
                    var v = $.ajax({
                        url: '/cargos/delete/',
                        type: 'POST',
                        datatype: 'json',
                        data: {id: $("#id").val()},
                        success: function(data) {
                            cargar(); //alert('Guardado Correctamente'); 
                        }, //mostramos el error
                        error: function() {
                            alert('Se ha producido un error Inesperado');
                        }
                    });
                }
            });
        } else {
            bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
        }
    });

    $("#add_pac").click(function() {
        if ($("#cargo_id_pac").val() != "") {
            if ($("#estado_cargo").val() == 'ADJUDICADO') {
                bootbox.alert("<strong>¡Mensaje!</strong> El cargo ya esta ADJUDICADO.");
            } else {
                //alert($("#cargo_id_pac").val());
                var v = $.ajax({
                    url: '/cargos/getEstadoSeguimiento/',
                    type: 'POST',
                    datatype: 'json',
                    data: {cargo_id: $("#cargo_id_pac").val()},
                    success: function(data) {
                        //alert(data);
                        if (data > -1) {
                            bootbox.alert("<strong>¡Mensaje!</strong> El cargo ya esta en proceso o esta en el PACP.");
                        } else {
                            // $("#popupWindow_pac").jqxWindow('open');
                            $('#myModal_pac').modal('show');
                        }

                    }, //mostramos el error
                    error: function() {
                        alert('Se ha producido un error Inesperado');
                    }
                });


            }
        } else {
            bootbox.alert("<strong>¡Mensaje!</strong> Para asignar PACP debe seleccionar un registro.");
        }

    });



    var listSource = [{label: 'Organigrama', value: 'unidad_administrativa', checked: true}, {
            label: 'Denominacion', value: 'denominacion', checked: true}, {label: 'Item', value: 'codigo', checked: true}, {label: 'Cargo', value: 'cargo', checked: true}, {label: 'Salario Mensual', value: 'sueldo', checked: true}, {label: 'Tipo Cargo', value: 'condicion', checked: true}, {label: 'Estado', value: 'estado', checked: true}, {label: 'Partida', value: 'partida', checked: true}, {label: 'Fuente Codigo', value: 'fuente_codigo', checked: true}, {label: 'Fuente', value: 'fuente', checked: false}, {label: 'Organismo Codigo', value: 'organismo_codigo', checked: true}, {label: 'Organismo', value: 'organismo', checked: false}];

    $("#jqxlistbox").jqxListBox({source: listSource, width: '100%', height: 300, theme:'custom', checkboxes: true});
    $("#jqxlistbox").on('checkChange', function(event) {
        $("#jqxgrid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#jqxgrid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#jqxgrid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#jqxgrid").jqxGrid('endupdate');
    });
    /*segundo grid*/

    cargar2();
    function cargar2() {
        var source =
                {
                    datatype: "json",
                    datafields: [
                        {name: 'nro', type: 'number'},
                        {name: 'id', type: 'number'},
                        {name: 'unidad_administrativa', type: 'string'},
                        {name: 'cargo', type: 'string'},
                        {name: 'estado', type: 'string'},
                        {name: 'gestion', type: 'string'},
                        {name: 'fecha_ini', type: 'date'},
                        {name: 'fecha_fin', type: 'date'}
                    ],
                    url: '/cargos/listpac',
                    cache: false
                };

        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#jqxgrid2").jqxGrid({
            width: '100%',  
            height:250,
            source: dataAdapter,
            sortable: true,
            altRows: true,
            theme: 'custom',
            //groupable: true,
            columnsresize: true,
            pageable: true,
            pagerMode: 'advanced',
            showfilterrow: true,
            filterable: true,
            //showtoolbar: true,
            autorowheight: true,
            columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function(row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                {text: 'Organigrama', datafield: 'unidad_administrativa', filtertype: 'input', width: '30%'},
                {text: 'Cargo', datafield: 'cargo', filtertype: 'input', width: '38%'},
                {text: 'Gestion', datafield: 'gestion', filtertype: 'number', width: '5%'},
                {text: 'Fecha Inicio', datafield: 'fecha_ini', filtertype: 'range', width: '10%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align: 'center'},
                {text: 'Fecha Finalización', datafield: 'fecha_fin', filtertype: 'range', width: '10%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align: 'center'},
                {text: 'Estado', datafield: 'estado', filtertype: 'input', width: '5%'}
            ]
        });

    }
    $("#jqxgrid2").bind('rowselect', function(event) {
        var dataRecord = $("#jqxgrid2").jqxGrid('getrowdata', event.args.rowindex);
        //alert(dataRecord.estado);
        $("#id_pac").val(dataRecord.id);
    });
    $("#delete_pac").click(function() {
        if ($("#id_pac").val() != "") {
            bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
                if (result == true) {
                    var v = $.ajax({
                        url: '/cargos/delete_pac/',
                        type: 'POST',
                        datatype: 'json',
                        data: {id: $("#id_pac").val()},
                        success: function(data) {
                            cargar2(); //alert('Guardado Correctamente'); 
                        }, //mostramos el error
                        error: function() {
                            alert('Se ha producido un error Inesperado');
                        }
                    });
                }
            });
        } else {
            bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
        }
    });

    /*******end segungo grid*********/
    // initialize the popup window and buttons.
    // $("#popupWindow").jqxWindow({
    // 	width: 850,height:500, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01           
    // });

    // // $("#popupWindow_pac").jqxWindow({
    // // 	width: 850, height:500,resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01           
    // // });
    // update the edited row when the user clicks the 'Save' button.




    $("#Save").click(function() {
        if ($('#testForm').jqxValidator('validate')) {
            //var cargo_estado_id = $('input[name="cargo_estado_id"]:checked').val();        
            //alert(cargo_estado_id); 
            var v = $.ajax({
                url: '/cargos/save/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val(), organigrama_id: $('#organigrama_id').val(), fin_partida_id: $('#fin_partida_id').val(), depende_id: $('#depende_id').val(), cargo: $("#cargo").val(), codigo_nivel: $("#codigo_nivel").val(), codigo: $('#codigo').val(), formacion_requerida: $("#formacion_requerida").val()},
                success: function(data) {
                    cargar(); //alert(data.msm); 
                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });
            //$("#popupWindow").jqxWindow('hide');
            $('#myModal_pac').modal('hide');
        }
    });

    $("#codigo_nivel").change(function() {
        var element = $(this).find('option:selected');
        var myTag = element.attr("sueldo");
        $('#sueldotxt').text(myTag);
    });

    /*************Select Dependiente*****************/
    $("#organigrama_id").change(function() {
        dependencia();
        // var id = $("#organigrama_id").find(':selected').val();
        // $("#depende_id").load('/cargos/dependencia/'+id);
    });

    function dependencia() {
        var id = $("#organigrama_id").find(':selected').val();
        $("#depende_id").load('/cargos/dependencia/' + id);
    }
    /***********************************************/

// $("#fecha_ini_pac").jqxDateTimeInput({width: '250px', height: '25px',formatString:'dd-MM-yyyy'});
// $("#fecha_fin_pac").jqxDateTimeInput({width: '250px', height: '25px',formatString:'dd-MM-yyyy'});

// $('#testForm').jqxValidator({
// 	rules: [
// 	{ input: "#organigrama_id input", message: "Campo requerido!", action: 'blur', rule: function (input, commit) {
// 		var index = $("#organigrama_id").jqxComboBox('getSelectedIndex');
// 		return index != -1;
// 		}
// 	},
// 	{ input: "#fin_partida_id input", message: "Campo requerido!", action: 'blur', rule: function (input, commit) {
// 		var index = $("#fin_partida_id").jqxComboBox('getSelectedIndex');
// 		return index != -1;
// 		}
// 	},

// { input: "#codigo_nivel input", message: "Campo requerido!", action: 'blur', rule: function (input, commit) {
// 	var index = $("#codigo_nivel").jqxComboBox('getSelectedIndex');
// 	return index != -1;
// }
// },
// { input: '#codigo', message: 'Campo requerido!', action: 'keyup, blur', rule: 'required' },
// { input: '#cargo', message: 'Campo requerido!', action: 'keyup, blur', rule: 'required' }
// ]
// });


    $('#testForm').validate({
        rules: {
            organigrama_id: {
                required: true,
            },
            codigo_nivel: {
                required: true,
            },
            codigo: {
                required: true,
            },
            cargo: {
                required: true
            },
            fin_partida_id: {
                required: true,
            },
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        },
        submitHandler: function(form) {
            var v = $.ajax({
                url: '/cargos/save/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val(), organigrama_id: $('#organigrama_id').val(), fin_partida_id: $('#fin_partida_id').val(), depende_id: $('#depende_id').val(), cargo: $("#cargo").val(), codigo_nivel: $("#codigo_nivel").val(), codigo: $('#codigo').val(), formacion_requerida: $("#formacion_requerida").val()},
                success: function(data) {
                    cargar(); //alert(data.msm); 
                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });
            $('#myModal').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
    //$("[name='organigrama_id']").css("position", "absolute").css("z-index","-9999").chosen().show();


    $('#testForm_pac').validate({
        rules: {
            gestion_pac: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
            element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        },
        submitHandler: function(form) {
            // form validates so do the ajax
            //alert("funciono");
            // var fecha_ini = $('#fecha_ini_pac').jqxDateTimeInput('getDate');
            // var fecha_fin = $('#fecha_fin_pac').jqxDateTimeInput('getDate');
            var fecha_ini = $('#fecha_ini_pac').val();
            var fecha_fin = $('#fecha_fin_pac').val();
            var v = $.ajax({
                url: '/cargos/save_pac/',
                type: 'POST',
                datatype: 'json',
                data: {cargo_id_pac: $("#cargo_id_pac").val(), gestion: $('#gestion_pac').val(), fecha_ini: fecha_ini, fecha_fin: fecha_fin},
                success: function(data) {
                    cargar2(); //alert(data); 
                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });
            //$("#popupWindow_pac").jqxWindow('hide');
            $('#myModal_pac').modal('hide');


            return false; // ajax used, block the normal submit
        }
    });


    /***********Reporte PDF**************/
    $("#rep_pdf").click(function() {
        $('#myModal_rep').modal('show');

    });

    $('#exportar_excel').click(function() {
        $('#testForm_rep').attr('action', '/cargos/exportarExcel/');
    });
    $('#exportar_pdf').click(function() {
        $('#testForm_rep').attr('action', '/cargos/exportarPdf/');
    });
    /**************************/

    /***********Reporte PDF PACP**************/
    $("#rep_pdf_pac").click(function() {
        $('#myModal_rep_pac').modal('show');

    });

    $('#exportar_pac_excel').click(function() {
        $('#testForm_rep_pac').attr('action', '/cargos/exportarPacExcel/');
    });
    $('#exportar_pac_pdf').click(function() {
        $('#testForm_rep_pac').attr('action', '/cargos/exportarPacPdf/');
    });
    /**************************/



});