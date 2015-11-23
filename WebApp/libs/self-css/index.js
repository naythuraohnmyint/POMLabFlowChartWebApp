$(function () {
    var processObj;
    var processObjArr = [];
    var returnObjArr = [];
    var modalflag;
    window.debug = false;

    /* Save-Download Button (Convert Div to JPG) */

    $("#btnSaveDownload").click(function (event) {

        $('.draggable > .input_percentage_progress').css('margin-top', "-53px");
        $('.draggable > .output_percentage_progress').css('margin-top', "-53px");
        $('.draggable > .input_percentage_progress').css('margin-left', "-40px");
        $('.draggable > .output_percentage_progress').css('margin-left', "-43px");

        $('#droppable').html2canvas({
            allowTaint: true,
            letterRendering: true,
            logging: true,
            taintTest: false,
            useCORS:true,
            onrendered: function (canvas) {

        var img = canvas.toDataURL("image/png");
        $('.draggable > .input_percentage_progress').css('margin-top', "-12px");
        $('.draggable > .output_percentage_progress').css('margin-top', "-12px");
        $('.draggable > .input_percentage_progress').css('margin-left', "-43px");
        $('.draggable > .output_percentage_progress').css('margin-left', "-45px");

        window.open(img);
            }
        });
    });

    /* Save-Download Button (Convert Div to JPG) */
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* Click Delete Key to remove component */

    $('html').keyup(function (e) {
        if (e.keyCode == 46) {
            $('.ui-selected').remove();
        }
    });

    /* Click Delete Key to remove component */
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */


    /* Click Reset button to clear localstorage */

    $("#btnReset").click(function (event) {
        localStorage.removeItem("processObjStorage");
        alert("Clear Successful");
    });

    /* Click Reset button to clear localstorage */
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* Center Modal */
    function centerModals($element) {
        var $modals;
        if ($element.length) {
            $modals = $element;
        } else {
            $modals = $('.modal-vcenter:visible');
        }
        $modals.each(function (i) {
            var $clone = $(this).clone().css('display', 'block').appendTo('body');
            var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top);
        });
    }
    $('.modal-vcenter').on('show.bs.modal', function (e) {
        centerModals($(this));
    });
    $(window).on('resize', centerModals);

    /* Center Modal */
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */


    /* Open Tab Modal */
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    $("#btnOpenModal").click(function () {
        $('#myModal4').modal('show');
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    var processIndex = 0;
    var mInputIndex = 0;
    var mOutputIndex = 0;
    var eInputIndex = 0;
  /*  var mInputNameValidators = {
        row: '.col-md-5',   // The title is placed inside a <div class="col-xs-4"> element
        validators: {
            notEmpty: {
                message: 'The title is required'
            }
        }
    };

    var mInputQtyValidators = {
        row: '.col-md-3',
        validators: {
            notEmpty: {
                message: 'The price is required'
            },
            numeric: {
                message: 'The price must be a numeric number'
            }
        }
    };

    var mInputUnitValidators = {
        row: '.col-md-3',
        validators: {
            notEmpty: {
                message: 'The ISBN is required'
            },
            isbn: {
                message: 'The ISBN is not valid'
            }
        }
    };*/


    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    $("#btnAddProcessType").click(function () {
        processIndex++;
        var $template = $("#template-process-type");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-process-type', processIndex).insertBefore($template);

        $clone.find('[name="typeofprocess"]').attr('name', 'typeofprocess[' + processIndex + '].name').end();
    });

    $(document).on('click', 'button.btnRemoveProcessType', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-process-type');
        $row.remove();
    });
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */


    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    $("#btnAddMInput").click(function () {
        mInputIndex++;
        var $template = $("#template-material-input");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-mInput-type', mInputIndex).insertBefore($template);

        $clone
        .find('[name="mInputName"]').attr('name', 'mInput[' + mInputIndex + '].name').end()
        .find('[name="mInputQty"]').attr('name', 'mInput[' + mInputIndex + '].qty').end()
        .find('[name="mInputUnit"]').attr('name', 'mInput[' + mInputIndex + '].unit').end();

        /*
        $('#bookForm')
        .formValidation('addField', 'mInput[' + mInputIndex + '].name', mInputNameValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].qty', mInputQtyValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].unit', mInputUnitValidators);*/

    });
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    $(document).on('click', 'button.btnRemoveMaterialInput', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-mInput-type');
        $row.remove();
    });
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /*  
    $('#mInputForm')
    .formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'mInput[0].name': mInputNameValidators,
            'mInput[0].qty': mInputQtyValidators,
            'mInput[0].unit': mInputUnitValidators
        }
    });
    */

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    $("#btnAddMOutput").click(function () {
        mOutputIndex++;
        var $template = $("#template-material-output");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-mOutput-type', mOutputIndex).insertBefore($template);

        $clone
        .find('[name="mOutputName"]').attr('name', 'mOutput[' + mOutputIndex + '].name').end()
        .find('[name="mOutputQty"]').attr('name', 'mOutput[' + mOutputIndex + '].qty').end()
        .find('[name="mOutputUnit"]').attr('name', 'mOutput[' + mOutputIndex + '].unit').end();

        /*
        $('#bookForm')
        .formValidation('addField', 'mInput[' + mInputIndex + '].name', mInputNameValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].qty', mInputQtyValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].unit', mInputUnitValidators);*/

    });

    $(document).on('click', 'button.btnRemoveMaterialOutput', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-mOutput-type');
        $row.remove();
    });

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    $("#btnAddEInput").click(function () {
        eInputIndex++;
        var $template = $("#template-energy-input");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-energy-input', eInputIndex).insertBefore($template);

        $clone
        .find('[name="eInputName"]').attr('name', 'eInput[' + eInputIndex + '].name').end()
        .find('[name="eInputQty"]').attr('name', 'eInput[' + eInputIndex + '].qty').end()
        .find('[name="eInputUnit"]').attr('name', 'eInput[' + eInputIndex + '].unit').end();

        /*
        $('#bookForm')
        .formValidation('addField', 'mInput[' + mInputIndex + '].name', mInputNameValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].qty', mInputQtyValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].unit', mInputUnitValidators);*/

    });

    $(document).on('click', 'button.btnRemoveEnergyInput', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-energy-input');
        $row.remove();
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    window.currentID;
    window.setcurrentID = function (currentIDparam)
    {
        currentID = currentIDparam;
    };

    window.getcurrentID = function (currentIDparam) {
        return currentID;
    };

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    $('div#droppable').dblclick(function (event) {

        modalflag = true;

        if (event.target.id === "") {
            alert("null");
        }
        else {
            alert("id: " + event.target.id + "class: " + event.target.class);
            setcurrentID(event.target.id);

            var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

            if (returnObjArr != null) {
                for (var i = 0; i < returnObjArr.length; i++) {
                    var obj = JSON.parse(returnObjArr[i]);

                    if (obj.current_id === event.target.id) {

                        $("#real-process-name").val(obj.real_process_name);
                        $("#display-process-name").val(obj.display_process_name);

                        var process_arr = obj.process_names;

                       // for (var i = 0; i < process_arr.length; i++)
                       // {
                            // alert(process_arr[i])
                       // }
                        $("#process-description").val(obj.process_desc);
                        //  obj.mInput_obj_arr
                        //  obj.mOutput_obj_arr
                        //  obj.eInput_obj_arr

                        returnObjArr[i] = JSON.stringify(obj);
                        modifyflag = false;
                        localStorage.setItem("processObjStorage", JSON.stringify(returnObjArr));
                        break;
                    }
                }
            }
                $('#myModal4').modal('show');
        }
        
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    window.saveProcess = function (currentIDparam) {

        var real_process_name = $('#real-process-name').val();
        var display_process_name = $('#display-process-name').val();
        var type_of_process_arr = [];
        var process_desc;
        var mInput_arr = [];
        var mOutput_arr = [];
        var eInput_arr = [];

        var modifyflag = true;

       
        for (var i = 0; i <=processIndex; i++)
        {
            type_of_process_arr[i] = $("[name='typeofprocess[" + i + "].name']").val();
        }

        process_desc = $("#process-description").val();

        for (var i = 0; i <= mInputIndex; i++) {
            var mInputObj = { 'name': $("[name='mInput[" + i + "].name']").val(), 'qty': $("[name='mInput[" + i + "].qty']").val(), 'unit': $("[name='mInput[" + i + "].unit']").val() };
            mInput_arr[i] = mInputObj;
        }

        for (var i = 0; i <= mOutputIndex; i++) {
            var mOutputObj = { 'name': $("[name='mOutput[" + i + "].name']").val(), 'qty': $("[name='mOutput[" + i + "].qty']").val(), 'unit': $("[name='mOutput[" + i + "].unit']").val() };
            mOutput_arr[i] = mOutputObj;
        }

        for (var i = 0; i <= eInputIndex; i++) {
            var eInputObj = { 'name': $("[name='eInput[" + i + "].name']").val(), 'qty': $("[name='eInput[" + i + "].qty']").val(), 'unit': $("[name='eInput[" + i + "].unit']").val() };
            eInput_arr[i] = eInputObj;
        }
        processObj = { 'current_id': currentIDparam, 'real_process_name': real_process_name, 'display_process_name': display_process_name, 'process_names': type_of_process_arr, 'process_desc': process_desc, 'mInput_obj_arr': mInput_arr, 'mOutput_obj_arr': mOutput_arr, 'eInput_obj_arr': eInput_arr };


        var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

            if (returnObjArr != null) {
                for (var i = 0; i < returnObjArr.length; i++) {
                    var obj = JSON.parse(returnObjArr[i]);

                    if (obj.current_id === currentIDparam) {

                        obj.real_process_name = processObj.real_process_name;
                        obj.display_process_name = processObj.display_process_name;
                        obj.process_names = processObj.process_names;
                        obj.process_desc = processObj.process_desc;
                        obj.mInput_obj_arr = processObj.mInput_obj_arr;
                        obj.mOutput_obj_arr = processObj.mOutput_obj_arr;
                        obj.eInput_obj_arr = processObj.eInput_obj_arr;

                        returnObjArr[i] = JSON.stringify(obj);
                        modifyflag = false;
                        localStorage.setItem("processObjStorage", JSON.stringify(returnObjArr));
                        break;
                    }
                }
            }

            if (modifyflag)
            {
                processObjArr.push(JSON.stringify(processObj));
                localStorage.setItem("processObjStorage", JSON.stringify(processObjArr));
            }

            var mInputTotal = 0;
            var mOutputTotal = 0;
            var eInputTotal = 0;

            var inputTotal = 0;

            for (var i = 0; i < mInput_arr.length; i++) {
                mInputTotal += parseInt(mInput_arr[i].qty);
            }
            for (var i = 0; i < mOutput_arr.length; i++) {
                mOutputTotal += parseInt(mOutput_arr[i].qty);
            }
            for (var i = 0; i < eInput_arr.length; i++) {
                eInputTotal += parseInt(eInput_arr[i].qty);
            }
           // alert("Total: " + mInputTotal +" , "+mOutputTotal+" , "+eInputTotal);

            inputTotal = mInputTotal + eInputTotal;

                   
                    //alert(mInputTotal);
                    
            $("#" + currentIDparam).find(".leftcontainer").find(".progress-bar").css('width', inputTotal + "%");
            $("#" + currentIDparam).find(".leftcontainer").find(".text_input_percentage").html(inputTotal + "%");

            $("#" + currentIDparam).find(".midcontainer").find(".text_process_name").html(display_process_name);

            $("#" + currentIDparam).find(".rightcontainer").find(".progress-bar").css('width', mOutputTotal + "%");
            $("#" + currentIDparam).find(".rightcontainer").find(".text_output_percentage").html(mOutputTotal + "%");
                    


            if (window.debug)
            {
                var str = "";
                str += "Real Process Name is: " + real_process_name + "\n";
                str += "Display Process Name is: " + display_process_name + "\n";
                str += "Processes: ";
                for (var i = 0; i < type_of_process_arr.length; i++) {
                    str += type_of_process_arr[i] + " ";
                }
                str += "\n\n";
                str += "Process Description is: " + process_desc;

                str += "\n\nMaterial Input is: \n\n";
                for (var i = 0; i < mInput_arr.length; i++) {
                    str += "Name: "+mInput_arr[i].name + " Qty: "+mInput_arr[i].qty+" Unit: "+mInput_arr[i].unit+"\n";
                }

                str += "\nMaterial Output is: \n\n";
                for (var i = 0; i < mOutput_arr.length; i++) {
                    str += "Name: " + mOutput_arr[i].name + " Qty: " + mOutput_arr[i].qty + " Unit: " + mOutput_arr[i].unit + "\n";
                }

                str += "\nEnergy Input is: \n\n";
                for (var i = 0; i < eInput_arr.length; i++) {
                    str += "Name: " + eInput_arr[i].name + " Qty: " + eInput_arr[i].qty + " Unit: " + eInput_arr[i].unit + "\n";
                }
                alert(str);
            }
        }
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    $('#btnSave').click(function (event) {

        var current_id = $('#id_process').text();
        var text_process_name = $('#process-name').val();
        var text_process_input_per = $('#process-input-percentage').val();
        var text_process_output_per = $('#process-output-percentage').val();
        var flag = true;

        processObj = { 'current_id': current_id, 'proces_name': text_process_name, 'process_input_percentage': text_process_input_per, 'process_output_percentage': text_process_output_per };

        var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

        if (returnObjArr != null) {
            for (var i = 0; i < returnObjArr.length; i++) {
                var obj = JSON.parse(returnObjArr[i]);
                if (obj.current_id === current_id) {

                    obj.proces_name = processObj.proces_name;
                    obj.process_input_percentage = processObj.process_input_percentage;
                    obj.process_output_percentage = processObj.process_output_percentage;

                    returnObjArr[i] = JSON.stringify(obj);
                    flag = false;
                    localStorage.setItem("processObjStorage", JSON.stringify(returnObjArr));
                    break;
                }
            }
        }
        if (flag)
        {
            processObjArr.push(JSON.stringify(processObj));
            localStorage.setItem("processObjStorage", JSON.stringify(processObjArr));
        }
        
        returnObjArr = null;
        returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

        for (var i = 0; i < returnObjArr.length; i++) {
            var obj = JSON.parse(returnObjArr[i]);
            if (current_id === obj.current_id)
            {
                $("#" + obj.current_id).find(".leftcontainer").find(".progress-bar").css('width', obj.process_input_percentage + "%");
                $("#" + obj.current_id).find(".leftcontainer").find(".text_input_percentage").html(obj.process_input_percentage + "%");
               
                $("#" + obj.current_id).find(".midcontainer").find(".text_process_name").html(obj.proces_name);
                
                $("#" + obj.current_id).find(".rightcontainer").find(".progress-bar").css('width', obj.process_output_percentage + "%");
                $("#" + obj.current_id).find(".rightcontainer").find(".text_output_percentage").html(obj.process_output_percentage + "%");

       
            } 
        }
    });
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
   
    $("#droppable").selectable();

    $(".draggable").draggable({
        appendTo: '#droppable',
        containment: "window",
        cursor: 'move',
        revertDuration: 400,
        revert: 'invalid',
        helper: 'clone',
        obstacle: ".draggable",
        preventCollision: true

    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    var newbox;
    var process_id_arr = [];
    var count = 0;


    $("#droppable").droppable({
        activeClass: "active",
        hoverClass: "hover",
        accept: ".draggable",
        drop: function (event, ui) {

            if ($(ui.draggable).attr("id") === "flowchartWindow") {
                count++;
                process_id_arr.push("flowchartWindow" + count);
                newbox = ui.helper.clone();

                var n = newbox.appendTo($(this)).attr('id', process_id_arr[count - 1]).addClass('process-box');


                /* Plumb */

                jsPlumb.ready(function () {

                    var instance = window.jsp = jsPlumb.getInstance({
                        DragOptions: { cursor: 'pointer', zIndex: 2000 },
                        ConnectionOverlays: [
                            ["Arrow", { location: 1 }],
                            ["Label", {
                                location: 0.1,
                                id: "label",
                                cssClass: "aLabel"
                            }]
                        ],
                        Container: "canvas"
                    });

                    var basicType = {
                        connector: "StateMachine",
                        paintStyle: { strokeStyle: "red", lineWidth: 2 },
                        hoverPaintStyle: { strokeStyle: "blue" },
                        overlays: [
                            "Arrow"
                        ]
                    };
                    instance.registerConnectionType("basic", basicType);

                    var connectorPaintStyle = {
                        lineWidth: 2,
                        strokeStyle: "#61B7CF",
                        joinstyle: "round",
                        outlineColor: "white",
                        outlineWidth: 1
                    },
                        connectorHoverStyle = {
                            lineWidth: 3,
                            strokeStyle: "#216477",
                            outlineWidth: 2,
                            outlineColor: "white"
                        },
                        endpointHoverStyle = {
                            fillStyle: "#216477",
                            strokeStyle: "#216477"
                        },
                   
                        sourceEndpoint = {
                            endpoint: "Dot",
                            paintStyle: {
                                strokeStyle: "#7AB02C",
                                fillStyle: "transparent",
                                radius:1,
                                lineWidth: 2
                            },
                            isSource: true,
                            connector: ["Flowchart", { stub: [40, 60], gap: 2, cornerRadius: 1, alwaysRespectStubs: true }],
                            connectorStyle: connectorPaintStyle,
                            hoverPaintStyle: endpointHoverStyle,
                            connectorHoverStyle: connectorHoverStyle,
                            maxConnections: -1, // additional
                            dragOptions: {},
                            dropOptions: { hoverClass: "hover", activeClass: "active" },
                            isTarget: true,
                            overlays: [
                                ["Label", {
                                    location: [0.5, 1.5],
                                    cssClass: "endpointSourceLabel"
                                }]
                            ]
                        },
                    
                        targetEndpoint = {
                            endpoint: "Dot",
                            paintStyle: {
                                strokeStyle: "#7AB02C",
                                fillStyle: "transparent",
                                radius: 1,
                                lineWidth: 2
                            },
                            isSource: true,
                            connector: ["Flowchart", { stub: [40, 60], gap: 2, cornerRadius: 1, alwaysRespectStubs: true }],
                            connectorStyle: connectorPaintStyle,
                            hoverPaintStyle: endpointHoverStyle,
                            connectorHoverStyle: connectorHoverStyle,
                            maxConnections: -1, // additional (infinite)
                            dragOptions: {},
                            dropOptions: { hoverClass: "hover", activeClass: "active" },
                            isTarget: true,
                            overlays: [
                                ["Label", {
                                    location: [0.5, 1.5],
                                    cssClass: "endpointSourceLabel"
                                }]
                            ]
                        },
                        init = function (connection) {
                            //connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
                        };

                    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
                        for (var i = 0; i < sourceAnchors.length; i++) {
                            var sourceUUID = toId + sourceAnchors[i];
                            instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
                                anchor: sourceAnchors[i], uuid: sourceUUID
                            });
                        }
                        for (var j = 0; j < targetAnchors.length; j++) {
                            var targetUUID = toId + targetAnchors[j];
                            instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
                        }
                    };

                    instance.batch(function () {

                        for (var i = 0; i < process_id_arr.length; i++) {
                            $("#" + process_id_arr[i]).addClass("window jtk-node");
                            var j = i + 1;
                            var str = "Window"+j;
                            _addEndpoints(str, ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
                            instance.draggable(jsPlumb.getSelector(".process-box"), { grid: [-20, -20] });
                            
                        }

                        instance.bind("connection", function (connInfo, originalEvent) {
                            init(connInfo.connection);
                        });

                        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });

                        instance.bind("click", function (conn, originalEvent) {
                            conn.toggleType("basic");
                            alret("click");
                        });

                        instance.bind("connectionDrag", function (connection) {
                            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
                            alret("drag");
                        });

                        instance.bind("connectionDragStop", function (connection) {
                            console.log("connection " + connection.id + " was dragged");
                        });

                        instance.bind("connectionMoved", function (params) {
                            console.log("connection " + params.connection.id + " was moved");
                        });
                    });

                    jsPlumb.fire("jsPlumbDemoLoaded", instance);


                });
                /* Plumb */

                //var spancol_input = $('<span style="margin-left:-40px; margin-top:-53px;"/>').attr({ 'class': 'col-md-2' });
                var spancol_input = $('<span style="margin-left:-43px; margin-top:-12px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
                var spancontainer_input = $('<span />').attr({ 'class': 'container' });
                var spanprogressvertical_input = $('<span />').attr({ 'class': 'progress vertical leftcontainer' });
                var spanprogressbarinfo_input = $('<span role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"/>').attr({ 'class': 'progress-bar progress-bar-info' });
                var spanpercentage_input = $('<span class="text_input_percentage" style="color:black; font-weight:bold"/>').html("0%");

                n = n.html(spancol_input.html(spancontainer_input.html(spanprogressvertical_input.html(spanprogressbarinfo_input.html(spanpercentage_input)))));

                var divprocessName = $('<div style="margin-left:20px;" />').attr({ 'class': 'col-md-8 midcontainer' });
                var ptag_processName = $('<p class="text_process_name"/>').text("New Process");
                var imgview_id = $.trim(process_id_arr[count - 1] + "_view");
                var imagetag_process = $('<img width="15px" src="../images/attention-to-detail-icon.png" style="margin-top:-20px;"/>').attr("id",imgview_id);

                $("#" + process_id_arr[count - 1]).append(divprocessName.append(ptag_processName).append(imagetag_process));

                // $("#" + process_id_arr[count - 1]).append(divprocessName.append(ptag_processName));

                //var spancol_output = $('<span style="margin-left:-43px; margin-top:-53px;"/>').attr({ 'class': 'col-md-2' });
                var spancol_output = $('<span style="margin-left:-45px; margin-top:-12px;"/>').attr({ 'class': 'col-md-2 output_percentage_progress' });
                var spancontainer_output = $('<span />').attr({ 'class': 'container' });
                var spanprogressvertical_output = $('<span />').attr({ 'class': 'progress vertical rightcontainer' });
                var spanprogressbarinfo_output = $('<span role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"/>').attr({ 'class': 'progress-bar progress-bar-success' });
                var spanpercentage_output = $('<span class="text_output_percentage" style="color:black; font-weight:bold"/>').html("0%");

                $("#" + process_id_arr[count - 1]).append(spancol_output.html(spancontainer_output.html(spanprogressvertical_output.html(spanprogressbarinfo_output.html(spanpercentage_output)))));
            }
            
            for (var i = 0; i < process_id_arr.length; i++) {
                $("#" + process_id_arr[i]).draggable(
                    {
                        containment: '#droppable',
                        cursor: 'move'
                    });

                $("#" + $.trim(process_id_arr[i] + "_view")).click(function (event) {
                    alert(event.target.id);
                });
            }


        }
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    
    /* Plumb */
    /*
    jsPlumb.ready(function () {

        var instance = window.jsp = jsPlumb.getInstance({
            // default drag options
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
            // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
            ConnectionOverlays: [
                ["Arrow", { location: 1 }],
                ["Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel"
                }]
            ],
            Container: "canvas"
        });

        var basicType = {
            connector: "StateMachine",
            paintStyle: { strokeStyle: "red", lineWidth: 4 },
            hoverPaintStyle: { strokeStyle: "blue" },
            overlays: [
                "Arrow"
            ]
        };
        instance.registerConnectionType("basic", basicType);

        // this is the paint style for the connecting lines..
        var connectorPaintStyle = {
            lineWidth: 4,
            strokeStyle: "#61B7CF",
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
        },
        // .. and this is the hover style.
            connectorHoverStyle = {
                lineWidth: 4,
                strokeStyle: "#216477",
                outlineWidth: 2,
                outlineColor: "white"
            },
            endpointHoverStyle = {
                fillStyle: "#216477",
                strokeStyle: "#216477"
            },
        // the definition of source endpoints (the small blue ones)
            sourceEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    strokeStyle: "#7AB02C",
                    fillStyle: "transparent",
                    radius: 7,
                    lineWidth: 3
                },
                isSource: true,
                connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
                connectorStyle: connectorPaintStyle,
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    ["Label", {
                        location: [0.5, 1.5],
                        cssClass: "endpointSourceLabel"
                    }]
                ]
            },
        // the definition of target endpoints (will appear when the user drags a connection)
            targetEndpoint = {
                endpoint: "Dot",
                paintStyle: { fillStyle: "#7AB02C", radius: 11 },
                hoverPaintStyle: endpointHoverStyle,
                maxConnections: -1,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    ["Label", { location: [0.5, -0.5], cssClass: "endpointTargetLabel" }]
                ]
            },
            init = function (connection) {
                connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
            };

        var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                });
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
            }
        };

        instance.batch(function () {

            
            _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
            _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
            _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
            _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
            _addEndpoints("Window5", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
            _addEndpoints("Window6", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
            


            instance.bind("connection", function (connInfo, originalEvent) {
                init(connInfo.connection);
            });

            instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
            
            
            instance.connect({ uuids: ["Window2TopCenter", "Window3TopCenter"], editable: true });
            instance.connect({ uuids: ["Window2LeftMiddle", "Window4LeftMiddle"], editable: true });
            instance.connect({ uuids: ["Window4TopCenter", "Window4RightMiddle"], editable: true });
            instance.connect({ uuids: ["Window3RightMiddle", "Window2RightMiddle"], editable: true });
            instance.connect({ uuids: ["Window4BottomCenter", "Window1TopCenter"], editable: true });
            instance.connect({ uuids: ["Window3BottomCenter", "Window1BottomCenter"], editable: true });
            instance.connect({ uuids: ["Window5BottomCenter", "Window6BottomCenter"], editable: true });
            
            
            instance.bind("click", function (conn, originalEvent) {
                conn.toggleType("basic");
            });

            instance.bind("connectionDrag", function (connection) {
                console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
            });

            instance.bind("connectionDragStop", function (connection) {
                console.log("connection " + connection.id + " was dragged");
            });

            instance.bind("connectionMoved", function (params) {
                console.log("connection " + params.connection.id + " was moved");
            });
        });

        jsPlumb.fire("jsPlumbDemoLoaded", instance);


    });
    */

   

});
