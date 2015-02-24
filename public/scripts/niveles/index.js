
$(document).ready(function() {
    var source =
            {
                datatype: "json",
                datafields: [
                    {name: 'id', type: 'number'},
                    {name: 'orden', type: 'number'},
                    {name: 'nivel_estructural', type: 'string'}
                ],
                url: '/nivelestructurales/list',
                cache: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargar();
    function cargar() {
        $("#jqxgrid").jqxGrid(
                {
                    width: '100%',
                    source: dataAdapter,
                    sortable: true,
                    altRows: true,
                    theme: 'custom',
                    pageable: true,
                    pagerMode: 'advanced',
                    showfilterrow: true,
                    filterable: true,
                    columns: [
                        {
                            text: '#', sortable: false, filterable: false, editable: false,
                            groupable: false, draggable: false, resizable: false,
                            datafield: '', columntype: 'number', width: '5%',
                            cellsrenderer: function(row, column, value) {
                                return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                            }
                        },                        
                        {text: 'Orden', datafield: 'orden', filtertype: 'number', width: '25%'},
                        {text: 'Nivel Estructural', datafield: 'nivel_estructural', filtertype: 'input', width: '70%'},
                    ]
                });

    }

    $("#jqxgrid").bind('rowselect', function(event) {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', event.args.rowindex);
        $("#id").val(dataRecord.id);
        $("#orden").val(dataRecord.orden);
        $("#nivel_estructural").val(dataRecord.nivel_estructural);
    });

// update the edited row when the user clicks the 'Save' button.
    $("#add").click(function() {
        $("#titulo").text("Adicionar");
        $("#id").val("");
        $("#orden").val("");
        $("#nivel_estructural").val("");
        $('#myModal').modal('show');
//$("#popupWindow").jqxWindow('open');
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
                        url: '/nivelestructurales/delete/',
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


    $('#testForm').validate({
        rules: {
            orden: {
                required: true
            },
            nivel_estructural: {
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
            var v = $.ajax({
                url: '/nivelestructurales/save/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val(), orden: $("#orden").val(), nivel_estructural: $("#nivel_estructural").val()},
                success: function(data) {
                    cargar(); //alert(data); 
                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });
            $('#myModal').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });


});