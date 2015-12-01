$(function () {
    var processObj;
    var processObjArr = [];
    var returnObjArr = [];
    window.debug = false;

    $("#noti-process").find(".alert-danger").hide();
    $("#noti-process").find(".alert-success").hide();

    // Clone the modal dialog
    var myBackup = $("#myModal4").clone();

    /* Save-Download Button (Convert Div to JPG) */

    $("button#btnSaveDownload").click(function (event) {

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
            window.jsPlumb.remove(window.getcurrentID());
            window.jsPlumb.detachEveryConnection();
            window.jsPlumb.deleteEveryEndpoint();
            window.jsPlumb.reset();
            alert("Current Deleted");

        }
    });

    /* Click Delete Key to remove component */
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */


    /* Click Reset button to clear localstorage */
    $(document).on('click', 'button#btnReset', function (event) {
        //window.ResetIndex();
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
    $(document).on('click', 'button#btnOpenModal', function () {
        $("#myModal4").remove();
        myBackup.modal('show');

    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    window.processIndex = 0;
    window.mInputIndex = 0;
    window.mOutputIndex = 0;
    window.eInputIndex = 0;

    window.ResetIndex = function ()
    {
        //alert("Reset Index!!");
        window.processIndex = 0;
        window.mInputIndex = 0;
        window.mOutputIndex = 0;
        window.eInputIndex = 0;
    }

    window.SetUpIndex = function (currentProcessIndex, currentmInputIndex, currentmOuputIndex, currenteInputIndex) {

        //alert("Reset Index!!");
        window.processIndex = currentProcessIndex;
        window.mInputIndex = currentmInputIndex;
        window.mOutputIndex = currentmOuputIndex;
        window.eInputIndex = currenteInputIndex;
    }
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

    $(document).on('click', 'button#btnAddProcessType', function () {
        window.processIndex++;
        var $template = $("#template-process-type");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-process-type', processIndex).insertBefore($template);

        $clone.find('[name="typeofprocess"]').attr('name', 'typeofprocess[' + processIndex + '].name').end();
    });

    // Important Note: Dynamic created button event listener

    $(document).on('click', 'button.btnRemoveProcessType', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-process-type');
        $row.remove();
        window.processIndex--;
    });
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */


    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    $(document).on('click', 'button#btnAddMInput', function () {
        window.mInputIndex++;
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
        if(window.mInputIndex!==0)
            window.mInputIndex--;
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
    $(document).on('click', 'button#btnAddMOutput', function () {
        window.mOutputIndex++;
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
        if(window.mOutputIndex!==0)
            window.mOutputIndex--;
    });

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $(document).on('click', 'button#btnAddEInput', function () {
        window.eInputIndex++;
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
        if(window.eInputIndex !==0)
            window.eInputIndex--;
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    window.currentID;
    window.dblClickCurrentProcessID;

    window.setcurrentID = function (currentIDparam)
    {
        window.currentID = currentIDparam;
    };

    window.getcurrentID = function () {
        return window.currentID;
    };

    window.setdblclickcurrentID = function (dblcurrentIDparam) {
        window.dblClickCurrentProcessID = dblcurrentIDparam;
    };

    window.getdblclickcurrentID = function () {
        return window.dblClickCurrentProcessID;
    };


    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    
    $(window).bind('beforeunload', function () {
        //return "Do you want to save your flowchart project?";
        localStorage.removeItem("processObjStorage");
    });
    
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    $(document).on("dblclick", "div#droppable", function (event) {

        window.setdblclickcurrentID(event.target.id);
       
        if (event.target.id === "") {
            alert("null");
        }
        else {
            //alert("id: " + event.target.id + "class: " + event.target.class);
            
            var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));
            if (returnObjArr != null)
            {
                for (var i = 0; i < returnObjArr.length; i++)
                {
                    var obj = JSON.parse(returnObjArr[i]);
                    if (obj.current_id === event.target.id)
                    {
                        $("#real-process-name").val(obj.real_process_name);
                        $("#display-process-name").val(obj.display_process_name);
                        $("#process-description").val(obj.process_desc);
                        var current_process_arr = JSON.parse(JSON.stringify(obj.process_names));
                        var current_mInput_arr = JSON.parse(JSON.stringify(obj.mInput_obj_arr));
                        var current_mOutput_arr = JSON.parse(JSON.stringify(obj.mOutput_obj_arr));
                        var current_eInput_arr = JSON.parse(JSON.stringify(obj.eInput_obj_arr));

                        var current_processIndex = obj.processIndex;
                        var current_mInputIndex = obj.mInputIndex;
                        var current_mOutputIndex = obj.mOutputIndex;
                        var current_eInputIndex = obj.eInputIndex;

                        alert("Current Process Index: " + current_processIndex + ", currentmInputIndex: " + current_mInputIndex + ", currentmOutputIndex: " + current_mOutputIndex + ", currenteInputIndex: " + current_eInputIndex);

                        if (current_process_arr.length !== 0) {
                            for (var i = 0; i < current_process_arr.length; i++) {
                                alert("P : " + current_process_arr[i].name);
                            }
                        }
                        else {
                            alert("Underfined Process Names");
                        }
                        
                        if (current_mInput_arr.length !== 0) {
                            for (var i = 0; i < current_mInput_arr.length; i++) {
                                alert("MI : " + current_mInput_arr[i].name);
                            }
                        }
                        else {
                            alert("Underfined Material Inputs");
                        }

                        if (current_mOutput_arr.length !== 0)
                        {
                            for (var i = 0; i < current_mOutput_arr.length; i++) {
                                alert("MO : " + current_mOutput_arr[i].name);
                            }
                        }
                        else {
                            alert("Underfined Material Outputs");
                        }
                        
                        if (current_eInput_arr.length !== 0) {
                            for (var i = 0; i < current_eInput_arr.length; i++) {
                                alert("EI : " + current_eInput_arr[i].name);
                            }
                        }
                        else {
                            alert("Underfined Energy Inputs");
                        }
                        break; // critical for time efficiency
                    }
                }
            }
            else {
               

            }
            $('#myModal4').modal('show');
        }
        
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    window.saveProcess = function (currentIDparam) {
        //alert("From save Process func: " + currentIDparam);

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
            type_of_process_arr[i] = {'name' : $("[name='typeofprocess[" + i + "].name']").val()};
        }

        process_desc = $("#process-description").val();

        //alert("mInputIndex: " + mInputIndex + " " + "mOuputIndex: " + mOutputIndex + " " + "eIndexIndex: " + eInputIndex);

        for (var i = 0; i <= mInputIndex; i++) {
            var mInputObj = { 'name': $("[name='mInput[" + i + "].name']").val(), 'qty': $("[name='mInput[" + i + "].qty']").val(), 'unit': $("[name='mInput[" + i + "].unit']").val() };
            mInput_arr[i] = mInputObj;
        }

        for (var i = 0; i <= mOutputIndex; i++) {
            //alert("Name: " + $("[name='mOutput[" + i + "].name']").val() + ", Qty:" + $("[name='mOutput[" + i + "].qty']").val() + ", Unit: " + $("[name='mOutput[" + i + "].unit']").val());
            var mOutputObj = { 'name': $("[name='mOutput[" + i + "].name']").val(), 'qty': $("[name='mOutput[" + i + "].qty']").val(), 'unit': $("[name='mOutput[" + i + "].unit']").val() };
            mOutput_arr[i] = mOutputObj;
        }

        for (var i = 0; i <= eInputIndex; i++) {
            var eInputObj = { 'name': $("[name='eInput[" + i + "].name']").val(), 'qty': $("[name='eInput[" + i + "].qty']").val(), 'unit': $("[name='eInput[" + i + "].unit']").val() };
            eInput_arr[i] = eInputObj;
        }
        processObj = { 'current_id': currentIDparam, 'real_process_name': real_process_name, 'display_process_name': display_process_name, 'processIndex': processIndex, 'process_names': type_of_process_arr, 'process_desc': process_desc, 'mInput_obj_arr': mInput_arr, 'mInputIndex': mInputIndex, 'mOutput_obj_arr': mOutput_arr, 'mOutputIndex': mOutputIndex, 'eInput_obj_arr': eInput_arr, 'eInputIndex': eInputIndex };


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
            var bootstrap_color = ["primary","success", "info", "warning", "danger"];

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
           
            var spancol_input = $('<span style="margin-left:-46px; margin-top:-11px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
            var spancontainer_input = $('<span />').attr({ 'class': 'container' });
            var spanprogressvertical_input = $('<span />').attr({ 'class': 'progress vertical leftcontainer' });
            var progressinfo_input = "";

             if (mInput_arr.length == 1)
             {
                 progressinfo_input += '<span class="progress-bar progress-bar-info" style="width:100%" title="'+mInput_arr[0].name +' : '+mInput_arr[0].qty+' '+mInput_arr[0].unit+'"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
             }
             else 
             {
                 var totalNum = 0;
                 var totalPer = [];
                 
                 for (var j = 0; j < mInput_arr.length; j++)
                 {
                     totalNum += parseFloat(mInput_arr[j].qty);
                 }
           
                 for (var k = 0; k < mInput_arr.length; k++) {
                     totalPer[k] = (100 * (mInput_arr[k].qty / totalNum)).toPrecision(3);
                     //alert(totalPer[i] + "%");
                 }
                 var x = 0;
                 while (totalPer[x] != null && mInput_arr[x] != null)
                 {
                     //alert(totalPer[x] + "%" + bootstrap_color[x % bootstrap_color.length]);
                     progressinfo_input += '<span class="progress-bar progress-bar-' + bootstrap_color[x % bootstrap_color.length] + '" style="width:' + totalPer[x] + '%" title="' + mInput_arr[x].name + ' : ' + mInput_arr[x].qty + ' ' + mInput_arr[x].unit + '"><span class="text_input_percentage" style="color:black; font-weight:bold">' + totalPer[x] + '%</span></span>';
                     x++;
                 }
             }
         

        var spanprogressbarinfo_input = $(progressinfo_input);
        $("#" + currentIDparam).html(spancol_input.html(spancontainer_input.html(spanprogressvertical_input.html(spanprogressbarinfo_input))));

        
        var divprocessName = $('<div style="margin-left:33px"/>').attr({ 'class': 'col-md-8' });
        /*
        var spanrow_ee = $('<span style="margin-left:10px; margin-top:-20px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
        var spancontainer_ee = $('<span />').attr({ 'class': 'container' });
        var spanprogresshorizontal_ee = $('<span />').attr({ 'class': 'progress horizontal-process leftcontainer' });
        var progressinfo_ee = '<span class="progress-bar progress-bar-info" style="width:100%"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';

        var spanprogressbarinfo_ee = $(progressinfo_ee);
        $("#" + currentIDparam).append(spanrow_ee.html(spancontainer_ee.html(spanprogresshorizontal_ee.html(spanprogressbarinfo_ee))));
        */

        var ptag_processName = $('<p class="text_process_name"/>').text(display_process_name);
        $("#" + currentIDparam).append(divprocessName.append(ptag_processName));

        var spancol_output = $('<span style="margin-left:-43px; margin-top:-11px;"/>').attr({ 'class': 'col-md-2 output_percentage_progress' });
        var spancontainer_output = $('<span />').attr({ 'class': 'container' });
        var spanprogressvertical_output = $('<span />').attr({ 'class': 'progress vertical rightcontainer' });
        var progressinfo_output = "";

        if (mOutput_arr.length == 1) {
            progressinfo_output += '<span class="progress-bar progress-bar-info" style="width:100%" title="' + mOutput_arr[0].name + ' : ' + mOutput_arr[0].qty + ' ' + mOutput_arr[0].unit + '"><span class="text_output_percentage" style="color:black; font-weight:bold">100%</span></span>';
        }
        else {
            var totalNum = 0;
            var totalPer = [];

            for (var j = 0; j < mOutput_arr.length; j++) {
                totalNum += parseFloat(mOutput_arr[j].qty);
            }

            for (var k = 0; k < mOutput_arr.length; k++) {
                totalPer[k] = (100 * (mOutput_arr[k].qty / totalNum)).toPrecision(3);
                //alert(totalPer[i] + "%");
            }
            var x = 0;
            while (totalPer[x] != null && mOutput_arr[x] != null) {
                // alert(totalPer[x] + "%" + bootstrap_color[x % bootstrap_color.length]);
                progressinfo_output += '<span class="progress-bar progress-bar-' + bootstrap_color[x % bootstrap_color.length] + '" style="width:' + totalPer[x] + '%" title="' + mOutput_arr[x].name + ' : ' + mOutput_arr[x].qty + ' ' + mOutput_arr[x].unit + '"><span class="text_output_percentage" style="color:black; font-weight:bold">' + totalPer[x] + '%</span></span>';
                x++;
            }
        }

        var spanprogressbarinfo_output = $(progressinfo_output);
        $("#" + currentIDparam).append(spancol_output.html(spancontainer_output.html(spanprogressvertical_output.html(spanprogressbarinfo_output))));

        if (mInputTotal === mOutputTotal) {
            $("#" + currentIDparam).removeClass('dashed-progress').addClass('complete-progress');
            $("#noti-process").find(".alert-danger").hide();
            $("#noti-process").find(".alert-success").show();
        }
        else {
            $("#" + currentIDparam).removeClass('complete-progress').addClass('dashed-progress');
            $("#noti-process").find(".alert-success").hide();
            $("#noti-process").find(".alert-danger").show();
        }
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
                //alert(str);
            }
        }
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
    window.count = 0;


    $("#droppable").droppable({
        activeClass: "active",
        hoverClass: "hover",
        accept: ".draggable",
        drop: function (event, ui) {

            if ($(ui.draggable).attr("id") === "flowchartWindow") {
                window.ResetIndex();
                count++;
                setcurrentID("flowchartWindow" + count);
                process_id_arr.push("flowchartWindow" + count);
                newbox = ui.helper.clone();

                var n = newbox.appendTo($(this)).attr('id', process_id_arr[count - 1]).addClass('process-box').addClass('dashed-progress');
                /* Plumb */

                window.jsPlumb.ready(function () {

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
                            instance.addEndpoint("flowchart" + toId, sourceEndpoint, { anchor: sourceAnchors[i], uuid: sourceUUID }); // case sensitive
                        }
                        for (var j = 0; j < targetAnchors.length; j++) {
                            var targetUUID = toId + targetAnchors[j];
                            instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID }); // case sensitive
                        }
                        //instance.draggable(jsPlumb.getSelector("#" + "flowchart" + toId), { grid: [0, 0] });
                    };

                    instance.batch(function () {
                        for (var i = 0; i <process_id_arr.length; i++) {
                            var j = i + 1;
                            var str ="Window"+j;
                            //alert("str: " + str);
                            _addEndpoints(str, ["LeftMiddle", "RightMiddle", "TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle", "TopCenter", "BottomCenter"]);
                            
                        }

                        instance.bind("connection", function (connInfo, originalEvent) {
                            init(connInfo.connection);
                        });

                        instance.connect({uuids: [null],editable: true});

                        instance.draggable(jsPlumb.getSelector("#" + window.getcurrentID()), { grid: [0, 0] });
                        //instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [0, 0] });

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

                    /*
                    jsPlumb.batch(function () {
                        // import here
                        for (var i = 0, j = process_id_arr.length; i < j; i++) {
                            jsPlumb.connect(connections[i]);
                        }
                    });*/

                    //jsPlumb.fire("jsPlumbDemoLoaded", instance);

                });
                /* Plumb */
            }
            
            for (var i = 0; i < process_id_arr.length; i++) {
                $("#" + process_id_arr[i]).draggable(
                    {
                        containment: '#droppable',
                        cursor: 'move'
                    });

                //$("#" + $.trim(process_id_arr[i] + "_view")).click(function (event) {
                //    alert(event.target.id);
                //});
            }


        }
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

});
