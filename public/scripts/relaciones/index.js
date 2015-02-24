$(document).ready(function() {
    var source =
            {
                datatype: "json",
                datafields: [
                    {name: 'id'},
                    {name: 'nombre'},
                    {name: 'cargo'},
                    {name: 'denominacion'},
                    {name: 'ci', type: 'string'},
                    {name: 'fecha_nac', type: 'date', format: 'dd-MM-yyyy'},
                    {name: 'oficina'},
                    {name: 'foto'},
                    {name: 'sueldo', type: 'float'},
                    {name: 'fecha_ini', type: 'date', format: 'dd-MM-yyyy'},
                    {name: 'fecha_incorporacion', type: 'date', format: 'dd-MM-yyyy'},
                ],
                url: '/relaciones/activosjson',
                cache: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#jqxgrid").jqxGrid(
            {
                width: '100%',
                source: dataAdapter,
                sortable: true,
                altRows: true,
                height: 330,
                //autoheight: true,
              autorowheight: true,
              pageable: true,
                // pagerMode: 'advanced',
                theme: 'custom',
                showfilterrow: true,
                columnsresize: true,
                columnsreorder: true,
                filterable: true,
              //  scrollmode: 'deferred',
                // pagesize: 4,
                scrollfeedback: function(row)
                {
                    return '<table style="height: 60px; width:60px;"><tr><td><img src="/personal/' + row.foto + '" style="height: 55px; width:55px;"/></td></tr><tr><td>' + row.nombre + '</td></tr></table>';
                },
                rendergridrows: function(obj)
                {
                    return obj.data;
                },
                rowsheight: 60,
                enabletooltips: true,
                groupable: true,
                columnsheight: 30,
                columns: [
                    {text: 'Foto', datafield: 'foto', width: '60',
                        cellsrenderer: function(row, column, value) {
                            return '<img src="/personal/' + value + '" style="height: 60px; width:60px;" />';
                        }
                    },
                    {text: 'NOMBRE', datafield: 'nombre', width: '13%', align: 'center'},
                    {text: 'CARGO', datafield: 'cargo', width: '14%', align: 'center'},
                    {text: 'DENOMINACION', datafield: 'denominacion', align: 'center', width: '14%', filtertype: 'checkedlist', },
                    {text: 'DEPENDENCIA', datafield: 'oficina', width: '14%', filtertype: 'checkedlist', },
                    {text: 'CI', datafield: 'ci', type: 'string', width: '8%'},
                    {text: 'HABER', datafield: 'sueldo', type: 'string', cellsformat: 'c2', width: '8%', cellsalign: 'right'},
                    {text: 'FECHA INI', datafield: 'fecha_ini', format: 'date', cellsformat: 'dd-MM-yyyy', filtertype: 'date', width: '8%'},
                    {text: 'FECHA INCOR', datafield: 'fecha_incorporacion', format: 'date', cellsformat: 'dd-MM-yyyy', filtertype: 'date', width: '8%'},
                    {text: 'FECHA NAC.', datafield: 'fecha_nac', format: 'date', cellsformat: 'dd-MM-yyyy', filtertype: 'date', width: '8%'},
                ]
            });




    /*nuevos*/
    var source2 =
            {
                datatype: "json",
                datafields: [
                    {name: 'id'},
                    {name: 'nombres'},
                    {name: 'apellidos'},
                    {name: 'ci', type: 'string'},
                    {name: 'foto', type: 'string'},
                    {name: 'fecha_nac', format: 'dd-MM-yyyy'},
                    {name: 'expd'},
                    {name: 'estado_civil'},
                    {name: 'genero'},
                    {name: 'nacionalidad'}
                ],
                url: '/relaciones/nuevosjson',
                cache: false
            };
    $("#jqxgrid233").on('rowclick', function() {
        // put the focus back to the Grid. Otherwise, the focus goes to the drag feedback element.
        //$("#jqxgrid2").jqxGrid('focus');
    });
    var columns = [
        //{text: 'Nro', datafield: 'id', width: '5%'},
        {text: 'Nombre(s)', datafield: 'nombres', type: 'string', width: '35%'},
        {text: 'Apellido(s)', datafield: 'apellidos', type: 'string', width: '30%'},
        {text: 'Doc. Ident.', datafield: 'ci', type: 'string', width: '13%'},
        //{text: 'FOTO', datafield: 'foto', type: 'string', width: '0', hide: 'true'},
        {text: 'EXP', datafield: 'expd', type: 'string', width: '5%'},
        {text: 'Fecha Nac.', datafield: 'fecha_nac', filtertype: 'date', cellsformat: 'dd-mm-yyyy', width: '17%'},
    ];
    var dataAdapter2 = new $.jqx.dataAdapter(source2);
    $("#jqxgrid2").jqxGrid(
            {
                width: '100%',
                height: 250,
                source: dataAdapter2,
                sortable: true,
                altRows: true,
                pageable: true,
                //  pagerMode: 'advanced',
                theme: 'custom',
                filterable: true,
                showfilterrow: true,
                columns: columns,
                rendered: function()
                {
                    // select all grid cells.
                    var gridCells = $('#jqxgrid2').find('.jqx-grid-content .jqx-grid-cell');
                    /* if ($('#jqxgrid2').jqxGrid('groups').length > 0) {
                     gridCells = $('#jqxgrid2').find('.jqx-grid-group-cell');
                     } */
                    // initialize the jqxDragDrop plug-in. Set its drop target to the second Grid.
                    gridCells.jqxDragDrop({
                        appendTo: 'body', dragZIndex: 99999,
                        dropAction: 'none',
                        initFeedback: function(feedback) {
                            feedback.height(25);
                            feedback.width(320);
                        }
                    });
                    // initialize the dragged object.
                    gridCells.off('dragStart');
                    gridCells.on('dragStart', function(event) {
                        var value = $(this).text();
                        var position = $.jqx.position(event.args);
                        var cell = $("#jqxgrid2").jqxGrid('getcellatposition', position.left, position.top);
                        $(this).jqxDragDrop('data', $("#jqxgrid2").jqxGrid('getrowdata', cell.row));
                        var groupslength = $('#jqxgrid2').jqxGrid('groups').length;
                        // update feedback's display value.
                        var feedback = $(this).jqxDragDrop('feedback');
                        var feedbackContent = $(this).parent().clone();
                        var table = '<table style=" border:solid 2px #333;" ><tr>';
                        $.each(feedbackContent.children(), function(index) {
                            if (index < groupslength)
                                return true;
                            table += '';
                            table += '<td >';
                            // table += columns[index - groupslength].text + ': ';
                            table += '</td>';
                            table += '<td><b> ';
                            table += $(this).text();
                            table += ' &nbsp;</b></td>';
                            table += '';
                        });
                        table += '</tr></table>';
                        feedback.html(table);
                    });
                    // set the new cell value when the dragged cell is dropped over the second Grid.      
                    gridCells.off('dragEnd');
                    gridCells.on('dragEnd', function(event) {
                        var value = $(this).jqxDragDrop('data');

                        var position = $.jqx.position(event.args);

                        var pageX = position.left;
                        var pageY = position.top;
                        var $form = $("#jqxgrid3");
                        var targetX = $form.offset().left;
                        var targetY = $form.offset().top;
                        var width = $form.width();
                        var height = $form.height();
                        // fill the form if the user dropped the dragged item over it.
                        if (pageX >= targetX && pageX <= targetX + width) {
                            if (pageY >= targetY && pageY <= targetY + height) {
                                var cell = $("#jqxgrid3").jqxGrid('getcellatposition', position.left, position.top);
                                if (cell != null) {
                                    var data = $('#jqxgrid3').jqxGrid('getrowdata', cell.row);
                                    $('input#id_persona').val(value.id);
                                    $('input#id_cargo').val(data.id);
                                    $('span#nombre').html(value.nombres + ' ' + value.apellidos);
                                    $('span#ci').html(value.ci);
                                    $('span#cargo').html(data.cargo);
                                    $('span#oficina').html(data.oficina);
                                    $('span#sueldo').html('Bs' + formatNumber(data.sueldo));
                                    $('img#foto').attr('src', '/personal/' + value.foto);
                                    $('img#foto').error(function() {
                                        $(this).attr('src', '/personal/hombre.jpg');
                                        if (value.genero == 'F') {
                                            $(this).attr('src', '/personal/mujer.jpg');
                                        }
                                    });
                                    //$('#foto').addClass('animation-pulse');
                                    $('#modal-regular').modal('show');
                                    //alert($("#jqxgrid").jqxGrid('getcellvalue', cell.row, cell.column));
                                    //$("#jqxgrid").jqxGrid('setcellvalue', cell.row, cell.column, value);
                                }
                                $('#jqxgrid3').jqxGrid('selectrow', cell.row);
                            }
                            //salert('Dese inlcuir a esta persona en la empresa');

                        }
                    });
                },
                //groupeable: true,

            });

    /*acefalos*/
    var source3 =
            {
                datatype: "json",
                datafields: [
                    {name: 'id'},
                    {name: 'cargo'},
                    {name: 'codigo'},
                    {name: 'oficina'},
                    {name: 'sueldo', type: 'float'},
                    {name: 'fecha_nac', format: 'date'},
                    {name: 'expd'},
                    {name: 'estado_civil'},
                    {name: 'nacionalidad'},
                    {name: 'condicion'},
                    {name: 'fecha_apr', format: 'date'}
                ],
                url: '/relaciones/cargosacefalos',
                cache: false
            };
    /* $("#jqxgrid3").on('rowclick', function () {
     // put the focus back to the Grid. Otherwise, the focus goes to the drag feedback element.
     $("#jqxgrid3").jqxGrid('focus');
     });*/
    var columns2 = [
        {text: 'ITEM/CODIGO', datafield: 'codigo', type: 'string', width: '8%'},
        {text: 'CARGO', datafield: 'cargo', width: '30%'},
        {text: 'OFICINA', datafield: 'oficina', width: '35%', filtertype: 'checkedlist'},
        {text: 'SUELDO', datafield: 'sueldo', type: 'string', filtertype: 'input', width: '12%', cellsformat: 'c2', cellsalign: 'right'},
        {text: 'CONDICION', datafield: 'condicion', type: 'string', filtertype: 'input', width: '14%', filtertype: 'checkedlist'},
                //{text: 'Nro', datafield: 'id', width: '6%'},
    ];
    var dataAdapter3 = new $.jqx.dataAdapter(source3);
    $("#jqxgrid3").jqxGrid(
            {
                width: '100%',
                height: 250,
                source: dataAdapter3,
                sortable: true,
                altRows: true,
                pageable: true,
                autorowheight: true,
                // pagerMode: 'advanced',
                theme: 'custom',
                showfilterrow: true,
                filterable: true,
                columns: columns2,
                //groupeable: true,

            });


    function formatNumber(num, prefix) {
        prefix = prefix || '';
        num += '';
        var splitStr = num.split(".");
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? "." + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, "$1" + "," + "$2");
        }
        return prefix + splitLeft + splitRight;
    }
    //imprimir file de personal
    $("a#print").click(function() {

        var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
        if (rowindex > -1)
        {
            //var s = $('#formulario').serialize();
            // console.log(s);
            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
            location.href = "/pdf/reporte/" + dataRecord.id;
        }
        else
        {
            alert("seleccione una persona por favor");
        }
    });
    $("form#my-dropzone").dropzone({
        url: "/personas/upload",
        maxFilesize: 2, // MB
        maxFiles: 1,
        acceptedFiles: 'image/jpeg',
        dictRemoveFile: true,
        init: function() {
            this.on("addedfile", function(file) {
                alert("Added file.");
            });
        },
        showDelete: true,
        
        removedfile: true,
        accept: function(file, done) {
            if (file.name == "justinbieber.jpg") {
                done("Naha, you don't.");
            }
            else {
                console.log(done());
            }
        }

    });

    $("#subirFoto").click(function() {
        var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
        if (rowindex > -1)
        {
            //var s = $('#formulario').serialize();
            // console.log(s);
            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
            // location.href = "/pdf/reporte/" + dataRecord.id;
            $('input#id_relacion').val(dataRecord.ci);
            $('h3#titleFoto').html(dataRecord.nombre);
            $('#fotografia').modal('show');
        }
        else
        {
            alert("seleccione una persona por favor");
        }


    });
    $("a#file").click(function() {
        var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
        if (rowindex > -1)
        {
            //var s = $('#formulario').serialize();
            // console.log(s);
            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
           location.href = "/relaciones/archivo/" + dataRecord.id;        
        }
        else
        {
            show_error();
        }


    });


    $("#excel").click(function() {
        $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');
    });
    $('#filtro').click(function() {
        $("#jqxgrid").jqxGrid('clearfilters');
    });
    
    
    function show_error() {
        var myStack = {"dir1":"down", "dir2":"right", "push":"top"};
	$.pnotify({
		title: 'Alerta',
		type: 'info',
		text: 'Escoja a una persona por favor.',
                stack: myStack,

                
	});
        
}
});








