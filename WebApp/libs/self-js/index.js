$(function () {
    var processObj;
    var processObjArr = [];
    var returnObjArr = [];
    window.debug = false;

    //var sankey = new Sankey();

    $("#noti-process").find(".alert-danger").hide();
    $("#noti-process").find(".alert-success").hide();

   

    $(document).on('click', 'div.colour-box', function () {
        $("#colorpicker-main").toggle();
    });

    // Inline colorpicker
    $('#getVal2').on('click', function () {
        // alert('Selected color = "' + $('#cpDiv').colorpicker("val") + '"');
        $("#mInputModalDetailColorcode").val($('#cpDiv').colorpicker("val"));
        $(".colour-box").css("background-color", $('#cpDiv').colorpicker("val"));
        $("#colorpicker-main").hide();
    });
    $('#setVal2').on('click', function () {
        $('#cpDiv').colorpicker("val", '#31859b');
    });
    $('#enable2').on('click', function () {
        $('#cpDiv').colorpicker("enable");
    });
    $('#disable2').on('click', function () {
        $('#cpDiv').colorpicker("disable");
    });
    $('#destroy2').on('click', function () {
        $('#cpDiv').colorpicker("destroy");
    });

    $('#cpDiv').colorpicker({ color: '#31859b' });
    $("#colorpicker-main").hide();


    // Clone the modal dialog
    // var myBackup = $("#myModal4").clone();
    //var myModalCode =  $('<div class="modal modal-vcenter fade" id="myModal4"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title"><b>Process Setting</b></h4></div><div class="modal-dialog modal-lg" id="noti-process" style="padding:5px; margin-top:-3px;"><div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Fail!</strong> Process Information are incorrect. Material Input and Output value are not match.</div><div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> Process Information are correct.</div></div><div class="container"></div><div class="modal-body" style="margin-top:-80px;"><div class="row"><div class="col-xs-12"><div id="example-embed"><h3>Identify Process</h3><section><div class="row"><div class="col-md-12">Process Name: </div></div><div class="row pushmarginform"><div class="col-md-12"><input type="text" class="form-control" id="real-process-name" placeholder="Enter Process Name" /></div></div><div class="row"><div class="col-md-12">Display Name: </div></div><div class="row pushmarginform"><div class="col-md-12"><input type="text" class="form-control" id="display-process-name" placeholder="Enter Display Name" /></div></div><div class="row"><div class="col-md-9"></div><div class="col-md-3"><button class="btn btn-primary" id="btnAddProcessType">Add Process Type</button></div></div><div class="row"><div class="col-md-12">Type of Process Involved: </div></div><div class="form-group row pushmarginform"><div class="col-md-11"><input type="text" class="form-control" placeholder="Enter Process" name="typeofprocess[0].name" /></div><div class="col-md-1"></div></div><div class="form-group row pushmarginform hide" id="template-process-type"><div class="col-md-11"><input type="text" name="typeofprocess" class="form-control" placeholder="Enter Process" /></div><div class="col-md-1"><button class="btn btn-warning btnRemoveProcessType"><span class="glyphicon glyphicon-remove"></span></button></div></div><div class="row"><div class="col-md-12">Process Description: </div></div><div class="row pushmarginform"><div class="col-md-12"><textarea class="form-control" placeholder="Enter Process Description" id="process-description"></textarea></div></div></section><h3>Define process parameter</h3><section><p>Coming Soon</p></section><h3>Determine material input/output</h3><section><div class="row"><div class="col-md-10"></div><div class="col-md-2"><button class="btn btn-primary" id="btnAddMInput">Add material</button></div></div><div class="row"><div class="col-md-4">Material Input: </div><div class="col-md-8"></div></div><div class="form-group row pushmarginform"><div class="col-md-5"><input type="text" class="form-control" placeholder="Name" name="mInput[0].name" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Quantity" name="mInput[0].qty" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Unit" name="mInput[0].unit" /></div><div class="col-md-1"></div></div><div class="form-group row pushmarginform hide" id="template-material-input"><div class="col-md-5"><input type="text" class="form-control" placeholder="Name" name="mInputName" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Quantity" name="mInputQty" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Unit" name="mInputUnit" /></div><div class="col-md-1"><button class="btn btn-warning btnRemoveMaterialInput"><span class="glyphicon glyphicon-remove"></span></button></div></div><div class="row"><div class="col-md-10"></div><div class="col-md-2"><button class="btn btn-primary" id="btnAddMOutput">Add material</button></div></div><div class="row"><div class="col-md-4">Material Output: </div><div class="col-md-8"></div></div><div class="form-group row pushmarginform"><div class="col-md-5"><input type="text" class="form-control" placeholder="Name" name="mOutput[0].name" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Quantity" name="mOutput[0].qty" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Unit" name="mOutput[0].unit" /></div><div class="col-md-1"></div></div><div class="form-group row pushmarginform hide" id="template-material-output"><div class="col-md-5"><input type="text" class="form-control" placeholder="Name" name="mOutputName" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Quantity" name="mOutputQty" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Unit" name="mOutputUnit" /></div><div class="col-md-1"><button class="btn btn-warning btnRemoveMaterialOutput"><span class="glyphicon glyphicon-remove"></span></button></div></div></section><h3>Determine energy input</h3><section><div class="row"><div class="col-md-10"></div><div class="col-md-2"><button class="btn btn-primary" id="btnAddEInput">Add material</button></div></div> <div class="row"><div class="col-md-4">Energy Input: </div><div class="col-md-8"></div></div><div class="form-group row pushmarginform"><div class="col-md-5"><input type="text" class="form-control" placeholder="Name" name="eInput[0].name" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Quantity" name="eInput[0].qty" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Unit" name="eInput[0].unit" /></div><div class="col-md-1"></div></div><div class="form-group row pushmarginform hide" id="template-energy-input"><div class="col-md-5"><input type="text" class="form-control" placeholder="Name" name="eInputName" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Quantity" name="eInputQty" /></div><div class="col-md-3"><input type="text" class="form-control" placeholder="Unit" name="eInputUnit" /></div><div class="col-md-1"><button class="btn btn-warning btnRemoveEnergyInput"><span class="glyphicon glyphicon-remove"></span></button></div></div></section></div></div></div></div><div class="modal-footer"><a href="#" data-dismiss="modal" class="btn btn-danger">Close</a></div></div></div></div>');
    // var myBackup = $('#myModal4').clone();

    $('#myModal4').on('hidden', function () {
        
        //$("#myModal4").remove();
        //$('#myModal4').modal('hide').remove();
        //var myClone = myBackup.clone();
        //$('body').append(myClone);
        alert("main modal close");
    });

    $(document).on('click', '.mInputNameDetailModal', function (event) {
        $("#myModal8").modal('show');
    });

    $(document).on('change', '.ddbmInputName', function (event) {

        var param = $(".ddbmInputName").val();

        if (param === "other")
        {
            //alert("Adding to database");
            $(".new-material-name").show();
        }
        else {
            $(".new-material-name").hide();
            var serviceUrl = "http://localhost/POMLabFlowChartWCF/Service.svc/density_g_mLByMaterialName/?materialName=" + param;
            $.ajax({
                type: "GET",
                url: serviceUrl,
                success: function (data) {
                    $("#mInputModalDetailDensity").val(data);
                },
                error: function (data) {
                    alert("Network Error!" + JSON.stringify(data));
                },
                dataType: "json"
            });

        }
    });


	$(document).on('click', 'button#btnRequest', function (event) {
 
	    $(".new-material-name").hide();

        var serviceUrl = "http://localhost/POMLabFlowChartWCF/Service.svc/materialNameList";
        $.ajax({
            type: "GET",
            url: serviceUrl,
            success: function (data) {
                var ddbmInputNameArr = data;
                $(".ddbmInputName").empty();
                var newOption = $('<option>');
                newOption.attr('value', "").text("SELECT MATERIAL");
                $(".ddbmInputName").append(newOption);

                for (var j = 0; j < ddbmInputNameArr.length; j++) {
                    var newOption = $('<option>');
                    //alert(ddbmInputNameArr[j]);
                    newOption.attr('value', ddbmInputNameArr[j]).text(ddbmInputNameArr[j]);
                    $(".ddbmInputName").append(newOption);
                }
                
                var newOption = $('<option>');
                newOption.attr('value', "other").text("Other");
                $(".ddbmInputName").append(newOption);

                alert("done");
            },
            error:function(data)
            {
                alert("Network Error!" + JSON.stringify(data));
            },
            dataType: "json"
        });
	       /* jQuery.support.cors = true;  */// for IE

    });

    // Delegated events because we make a copy, and the copied button does not exist onDomReady

    /* Save-Download Button (Convert Div to JPG) */

    $("button#btnSaveDownload").click(function (event) {

        $('.draggable > .input_percentage_progress').css('margin-top', "-53px");
        $('.draggable > .output_percentage_progress').css('margin-top', "-53px");
        $('.draggable > .input_percentage_progress').css('margin-left', "-40px");
        $('.draggable > .output_percentage_progress').css('margin-left', "-43px");

        $('#sankey').html2canvas({
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
            /*
            var anchors = ["LeftMiddle", "RightMiddle", "TopCenter", "BottomCenter"]; // tag2

            for (var j = 0; j <= count; j++) {
                for (var i = 0; i < anchors.length; i++) {
                    var UUID = "flowchartWindow" + j + anchors[i];
                    instance.removeEndpoint("flowchartWindow" + j, sourceEndpoint, { anchor: anchors[j], uuid: UUID });
                    instance.removeEndpoint("flowchartWindow" + j, targetEndpoint, { anchor: anchors[j], uuid: UUID });
                }
            }
            */
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
        //$("#myModal4").remove();
        //myBackup.modal('show');

        $.ajax({
            type: "GET",
            url: "../modal-libs/jquery.steps.js",
            dataType: "script",
            cache: true
        });

        $.ajax({
            type: "GET",
            url: "../modal-libs/jquery.cookie-1.3.1.js",
            dataType: "script",
            cache: true
        });

        $.ajax({
            type: "GET",
            url: "../modal-libs/modernizr-2.6.2.min.js",
            dataType: "script",
            cache: true
        });

        $.ajax({
            type: "GET",
            url: "../modal-libs/modaljs.js",
            dataType: "script",
            cache: true
        });

        //$("#myModalDynamic").append(myModalCode);

        $("#noti-process").find(".alert-danger").hide();
        $("#noti-process").find(".alert-success").hide();

        $("#myModal4").modal('show');

    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    window.processIndex = 0;
    window.mInputIndex = 0;
    window.mOutputIndex = 0;
    window.eInputIndex = 0;


    window.eInputModalIndex = 0;
    window.mInputModalIndex = 0;
    window.mOutputModalIndex = 0;

    window.ResetIndex = function ()
    {
        //alert("Reset Index!!");
        window.processIndex = 0;
        window.mInputIndex = 0;
        window.mOutputIndex = 0;
        window.eInputIndex = 0;
        //window.eInputModalIndex = 0;
        //window.mInputModalIndex = 0;
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
        .find('[name="mInputUnit"]').attr('name', 'mInput[' + mInputIndex + '].unit').end()
        .find('[name="mInputColorCode"]').attr('name', 'mInput[' + mInputIndex + '].colorcode').end()
        .find('[name="mInputColorpick"]').attr('name', 'mInput[' + mInputIndex + '].colorpick').end();

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
        .find('[name="mOutputUnit"]').attr('name', 'mOutput[' + mOutputIndex + '].unit').end()
        .find('[name="mOutputColorCode"]').attr('name', 'mOutput[' + mOutputIndex + '].colorcode').end()
        .find('[name="mOutputColorpick"]').attr('name', 'mOutput[' + mOutputIndex + '].colorpick').end();
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
        .find('[name="eInputUnit"]').attr('name', 'eInput[' + eInputIndex + '].unit').end()
        .find('[name="eInputColorCode"]').attr('name', 'eInput[' + eInputIndex + '].colorcode').end()
        .find('[name="eInputColorpick"]').attr('name', 'eInput[' + eInputIndex + '].colorpick').end();
        /*
        $('#bookForm')
        .formValidation('addField', 'mInput[' + mInputIndex + '].name', mInputNameValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].qty', mInputQtyValidators)
        .formValidation('addField', 'mInput[' + mInputIndex + '].unit', mInputUnitValidators);*/

    });


    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $(document).on('click', 'button#btnAddEInputModal', function () {
        window.eInputModalIndex++;
        var $template = $("#template-energy-modal-input");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-energy-input-modal', eInputModalIndex).insertBefore($template);

        $clone
        .find('[name="eInputModalName"]').attr('name', 'eInputModal[' + eInputModalIndex + '].name').end()
        .find('[name="eInputModalQty"]').attr('name', 'eInputModal[' + eInputModalIndex + '].qty').end()
        .find('[name="eInputModalUnit"]').attr('name', 'eInputModal[' + eInputModalIndex + '].unit').end();
    });




    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $(document).on('click', 'button#btnAddMInputModal', function () {
        window.mInputModalIndex++;
        var $template = $("#template-material-modal-input");
        var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-material-input-modal', mInputModalIndex).insertBefore($template);

        $clone
        .find('[name="mInputModalName"]').attr('name', 'mInputModal[' + mInputModalIndex + '].name').end()
        .find('[name="mInputModalQty"]').attr('name', 'mInputModal[' + mInputModalIndex + '].qty').end()
        .find('[name="mInputModalUnit"]').attr('name', 'mInputModal[' + mInputModalIndex + '].unit').end();

        var selectedInputID = $('#ddbInputProcess').val();

        if (selectedInputID != null)
        {
            var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

            if (returnObjArr != null)
            {
                for (var i = 0; i < returnObjArr.length; i++)
                {
                    var obj = JSON.parse(returnObjArr[i]);
                    if (obj.current_id === selectedInputID)
                    {
                        var current_mOutput_arr = JSON.parse(JSON.stringify(obj.mOutput_obj_arr));
                        if (current_mOutput_arr.length !== 0)
                        {
                            $(".mInputModalName").empty();
                            var newOption = $('<option>');
                            newOption.attr('value', "").text("SELECT MATERIAL");
                            $(".mInputModalName").append(newOption);

                            for (var j = 0; j < current_mOutput_arr.length; j++)
                            {
                                var newOption = $('<option>');
                                newOption.attr('value', current_mOutput_arr[j].name).text(current_mOutput_arr[j].name);
                                $(".mInputModalName").append(newOption);
                            }
                        }
                        else
                        {
                            //  alert("Underfined Material Inputs");
                        }
                        break; // critical for time efficiency
                    }
                }
            }
        }

    });



    $(document).on('click', 'button.btnRemoveEnergyInput', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-energy-input');
        $row.remove();
        if(window.eInputIndex !==0)
            window.eInputIndex--;
    });



    $(document).on('click', 'button.btnRemoveEnergyInputModal', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-energy-input-modal');
        $row.remove();
        if (window.eInputModalIndex !== 0)
            window.eInputModalIndex--;
    });


    $(document).on('click', 'button.btnRemoveMaterialInputModal', function () {
        var $row = $(this).parents('.form-group'),
            index = $row.attr('data-material-input-modal');
        $row.remove();
        if (window.mInputModalIndex !== 0)
            window.mInputModalIndex--;
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

    $(document).on("dblclick", "div#sankey", function (event) {
       // alert("Current ID " + event.target.id);
        window.setdblclickcurrentID(event.target.id);
       
        if (event.target.id === "") {
            alert("null");
        }
        else {
            //alert("id: " + event.target.id + "class: " + event.target.class);
            $("#current-process-id").text(window.getdblclickcurrentID());
            var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));
            if (returnObjArr != null)
            {
                for (var i = 0; i < returnObjArr.length; i++)
                {
                    var obj = JSON.parse(returnObjArr[i]);
                    if (obj.current_id === event.target.id)
                    {
                        alert("Existing OBJ " + JSON.stringify(obj));

                        $("#real-process-name").val(obj.real_process_name);
                        $("#display-process-name").val(obj.display_process_name);
                        $("#process-description").val(obj.process_desc);
                        var current_process_arr = JSON.parse(JSON.stringify(obj.process_names));
                        var current_mInput_arr = JSON.parse(JSON.stringify(obj.mInput_obj_arr));
                        var current_mOutput_arr = JSON.parse(JSON.stringify(obj.mOutput_obj_arr));
                        var current_eInput_arr = JSON.parse(JSON.stringify(obj.eInput_obj_arr));

                        var current_processIndex = parseInt(JSON.stringify(obj.processIndex));
                        var current_mInputIndex = parseInt(JSON.stringify(obj.mInputIndex));
                        var current_mOutputIndex = parseInt(JSON.stringify(obj.mOutputIndex));
                        var current_eInputIndex = parseInt(JSON.stringify(obj.eInputIndex));

                       // alert("Current Process Index: " + current_processIndex + ", currentmInputIndex: " + current_mInputIndex + ", currentmOutputIndex: " + current_mOutputIndex + ", currenteInputIndex: " + current_eInputIndex);

                        if (current_process_arr.length !== 0) {

                            var temp = 0;
                            for (var i = 0; i < current_process_arr.length; i++) {
                                
                                //alert("previous value " + $("[name='typeofprocess[" + i + "].name']").val());

                                if ($("[name='typeofprocess[" + i + "].name']").val())
                                {
                                    $("[name='typeofprocess[" + i + "].name']").val(current_process_arr[i].name);
                                }
                                else
                                {
                                    //alert("create again");
                                    var $template = $("#template-process-type");
                                    var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-process-type', processIndex).insertBefore($template);
                                    $clone.find('[name="typeofprocess"]').attr('name', 'typeofprocess[' + i + '].name').end();
                                    $("[name='typeofprocess[" + i + "].name']").val(current_process_arr[i].name)
                                }
                                
                                temp = i;
                            }
                            
                            temp = temp + 1; // a little error
                            while ($("[name='typeofprocess[" + temp+ "].name']").val())
                            {
                                //alert("remove already");
                                $("[name='typeofprocess[" + i + "].name']").parent().parent().remove();
                                temp++;
                            }
                        }
                        else {
                          //  alert("Underfined Process Names");
                        }
                        // tag now
                        if (current_mInput_arr.length !== 0) {

                            var temp = 0;

                            for (var i = 0; i < current_mInput_arr.length; i++) {
                                //  alert("MI : " + current_mInput_arr[i].name);

                                if ($("[name='mInput[" + i + "].name']").val()) {

                                    $("[name='mInput[" + i + "].name']").val(current_mInput_arr[i].name);
                                    $("[name='mInput[" + i + "].qty']").val(current_mInput_arr[i].qty);
                                    $("[name='mInput[" + i + "].unit']").val(current_mInput_arr[i].unit);
                                }
                                else {
                                    //alert("create again");
                                    var $template = $("#template-material-input");
                                    var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-mInput-type', mInputIndex).insertBefore($template);

                                    $clone
                                    .find('[name="mInputName"]').attr('name', 'mInput[' + i + '].name').end()
                                    .find('[name="mInputQty"]').attr('name', 'mInput[' + i + '].qty').end()
                                    .find('[name="mInputUnit"]').attr('name', 'mInput[' + i + '].unit').end();

                                    $("[name='mInput[" + i + "].name']").val(current_mInput_arr[i].name);
                                    $("[name='mInput[" + i + "].qty']").val(current_mInput_arr[i].qty);
                                    $("[name='mInput[" + i + "].unit']").val(current_mInput_arr[i].unit);
                                }

                                temp = i;
                            }

                            temp = temp + 1; // a little error
                            while ($("[name='mInput[" + temp + "].name']").val()) {
                                //alert("remove already");
                                $("[name='mInput[" + i + "].name']").parent().parent().remove();
                                temp++;
                            }
                        }
                        else {
                          //  alert("Underfined Material Inputs");
                        }


                        if (current_mOutput_arr.length !== 0) {

                            var temp = 0;

                            for (var i = 0; i < current_mOutput_arr.length; i++) {

                                if ($("[name='mOutput[" + i + "].name']").val()) {

                                    $("[name='mOutput[" + i + "].name']").val(current_mOutput_arr[i].name);
                                    $("[name='mOutput[" + i + "].qty']").val(current_mOutput_arr[i].qty);
                                    $("[name='mOutput[" + i + "].unit']").val(current_mOutput_arr[i].unit);
                                }
                                else {
                                    //alert("create again");
                                    var $template = $("#template-material-output");
                                    var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-mOutput-type', mOutputIndex).insertBefore($template);

                                    $clone
                                    .find('[name="mOutputName"]').attr('name', 'mOutput[' + i + '].name').end()
                                    .find('[name="mOutputQty"]').attr('name', 'mOutput[' + i + '].qty').end()
                                    .find('[name="mOutputUnit"]').attr('name', 'mOutput[' + i + '].unit').end();

                                    $("[name='mOutput[" + i + "].name']").val(current_mOutput_arr[i].name);
                                    $("[name='mOutput[" + i + "].qty']").val(current_mOutput_arr[i].qty);
                                    $("[name='mOutput[" + i + "].unit']").val(current_mOutput_arr[i].unit);
                                }

                                temp = i;
                            }

                            temp = temp + 1; // a little error
                            while ($("[name='mOutput[" + temp + "].name']").val()) {
                                //alert("remove already");
                                $("[name='mOutput[" + i + "].name']").parent().parent().remove();
                                temp++;
                            }
                        }
                    else {
                        //  alert("Underfined Material Inputs");
                        }


                        if (current_eInput_arr.length !== 0) {

                            var temp = 0;

                            for (var i = 0; i < current_eInput_arr.length; i++) {

                                if ($("[name='eInput[" + i + "].name']").val()) {

                                    $("[name='eInput[" + i + "].name']").val(current_eInput_arr[i].name);
                                    $("[name='eInput[" + i + "].qty']").val(current_eInput_arr[i].qty);
                                    $("[name='eInput[" + i + "].unit']").val(current_eInput_arr[i].unit);
                                }
                                else {
                                    //alert("create again");
                                    var $template = $("#template-energy-input");
                                    var $clone = $template.clone().removeClass("hide").removeAttr("id").attr('data-eInput-type', eInputIndex).insertBefore($template);

                                    $clone
                                    .find('[name="eInputName"]').attr('name', 'eInput[' + i + '].name').end()
                                    .find('[name="eInputQty"]').attr('name', 'eInput[' + i + '].qty').end()
                                    .find('[name="eInputUnit"]').attr('name', 'eInput[' + i + '].unit').end();

                                    $("[name='eInput[" + i + "].name']").val(current_eInput_arr[i].name);
                                    $("[name='eInput[" + i + "].qty']").val(current_eInput_arr[i].qty);
                                    $("[name='eInput[" + i + "].unit']").val(current_eInput_arr[i].unit);
                                }

                                temp = i;
                            }

                            temp = temp + 1; // a little error
                            while ($("[name='eInput[" + temp + "].name']").val()) {
                                //alert("remove already");
                                $("[name='eInput[" + i + "].name']").parent().parent().remove();
                                temp++;
                            }
                        }
                        else {
                            //  alert("Underfined Material Inputs");
                        } break; // critical for time efficiency

                    }
                }
            }
            else {
                // new process 



            }
            $('#myModal4').modal('show');
        }
        
    });

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    window.checkValue = function ()
    {
        var mInput_arr = [];
        var mOutput_arr = [];
        var mInputTotal = 0;
        var mOutputTotal = 0;

        for (var i = 0; i <= mInputIndex; i++) {
            var mInputObj = { 'name': $("[name='mInput[" + i + "].name']").val(), 'qty': $("[name='mInput[" + i + "].qty']").val(), 'unit': $("[name='mInput[" + i + "].unit']").val() };
            mInput_arr[i] = mInputObj;
        }

        for (var i = 0; i <= mOutputIndex; i++) {
            //alert("Name: " + $("[name='mOutput[" + i + "].name']").val() + ", Qty:" + $("[name='mOutput[" + i + "].qty']").val() + ", Unit: " + $("[name='mOutput[" + i + "].unit']").val());
            var mOutputObj = { 'name': $("[name='mOutput[" + i + "].name']").val(), 'qty': $("[name='mOutput[" + i + "].qty']").val(), 'unit': $("[name='mOutput[" + i + "].unit']").val() };
            mOutput_arr[i] = mOutputObj;
        }

        for (var i = 0; i < mInput_arr.length; i++) {
            mInputTotal += parseInt(mInput_arr[i].qty);
          //  alert("mInput" + mInputTotal);
        }
        for (var i = 0; i < mOutput_arr.length; i++) {
            mOutputTotal += parseInt(mOutput_arr[i].qty);
         //   alert("mOutput" + mOutputTotal);
        }


        /*if (mInputTotal === mOutputTotal) {
          //  alert("same");
            $("#noti-process-process").find(".alert-danger").show();
            $("#noti-process-process").find(".alert-success").hide();
        }
        else {
          //  alert("diff");
            
        }*/
        $("#noti-process-process").find(".alert-danger").hide();
        $("#noti-process-process").find(".alert-success").show();


    }

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
            type_of_process_arr[i] = {'name' : $("[name='typeofprocess[" + i + "].name']").val()};
        }

        process_desc = $("#process-description").val();

        //alert("mInputIndex: " + mInputIndex + " " + "mOuputIndex: " + mOutputIndex + " " + "eIndexIndex: " + eInputIndex);

        for (var i = 0; i <= mInputIndex; i++) {
            var mInputObj = { 'name': $("[name='mInput[" + i + "].name']").val(), 'qty': $("[name='mInput[" + i + "].qty']").val(), 'unit': $("[name='mInput[" + i + "].unit']").val(), 'colorcode': $("[name='mInput[" + i + "].colorcode']").text() };
            mInput_arr[i] = mInputObj;
        }

        for (var i = 0; i <= mOutputIndex; i++) {
            var mOutputObj = { 'name': $("[name='mOutput[" + i + "].name']").val(), 'qty': $("[name='mOutput[" + i + "].qty']").val(), 'unit': $("[name='mOutput[" + i + "].unit']").val(), 'colorcode': $("[name='mOutput[" + i + "].colorcode']").text() };
            mOutput_arr[i] = mOutputObj;
        }

        for (var i = 0; i <= eInputIndex; i++) {
            var eInputObj = { 'name': $("[name='eInput[" + i + "].name']").val(), 'qty': $("[name='eInput[" + i + "].qty']").val(), 'unit': $("[name='eInput[" + i + "].unit']").val(), 'colorcode': $("[name='eInput[" + i + "].colorcode']").text() };
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
           
        var spancol_input = $('<span style="margin-left:-46px; margin-top:9px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
        var spancontainer_input = $('<span />').attr({ 'class': 'container' });
        var spanprogressvertical_input = $('<span />').attr({ 'class': 'progress vertical leftcontainer' });
        var progressinfo_input = "";

        

        if (mInput_arr.length == 1)
        {
            $(function () {

                $.ajax({
                    type: "GET",
                    url: "../bootstrap-3.3.5-libs/css/bootstrap-theme.min.css",
                    dataType: "script",
                    cache: true
                });

                var modifiedbar = $(".progress-bar-success");
                modifiedbar.css({ "background-color": mInput_arr[0].colorcode });
            });

            progressinfo_input += '<span class="progress-bar progress-bar-success" style="width:100%" title="' + mInput_arr[0].name + ' : ' + mInput_arr[0].qty + ' ' + mInput_arr[0].unit + '"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
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
                $(function () {

                    $.ajax({
                        type: "GET",
                        url: "../bootstrap-3.3.5-libs/css/bootstrap-theme.min.css",
                        dataType: "script",
                        cache: true
                    });

                    var modifiedbar = $(".progress-bar-success");
                    modifiedbar.css({ "background-color": mInput_arr[x].colorcode });
                });
                progressinfo_input += '<span class="progress-bar progress-bar-success" style="width:' + totalPer[x] + '%" title="' + mInput_arr[x].name + ' : ' + mInput_arr[x].qty + ' ' + mInput_arr[x].unit + '"><span class="text_input_percentage" style="color:black; font-weight:bold">' + totalPer[x] + '%</span></span>';
                x++;
            }
        }
         
        var spanprogressbarinfo_input = $(progressinfo_input);
        $("#" + currentIDparam).html(spancol_input.html(spancontainer_input.html(spanprogressvertical_input.html(spanprogressbarinfo_input))));
        
        var divprocessName = $('<div style="margin-left:33px; margin-top:-95px;"/>').attr({ 'class': 'col-md-8' });
        
        var spanrow_ee = $('<span style="margin-left:50px; margin-top:-20px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
        var spancontainer_ee = $('<span />').attr({ 'class': 'container' });
        var spanprogresshorizontal_ee = $('<span />').attr({ 'class': 'progress horizontal-process leftcontainer' });
        var progressinfo_ee = '<span class="progress-bar progress-bar-info" style="width:100%"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
        var spanprogressbarinfo_ee = $(progressinfo_ee);

        $("#" + currentIDparam).append(spanrow_ee.html(spancontainer_ee.html(spanprogresshorizontal_ee.html(spanprogressbarinfo_ee))));


        var spanrow_el = $('<span style="margin-left:-33px; margin-top:10px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
        var spancontainer_el = $('<span />').attr({ 'class': 'container' });
        var spanprogresshorizontal_el = $('<span />').attr({ 'class': 'progress horizontal-process leftcontainer' });
        var progressinfo_el = '<span class="progress-bar progress-bar-info" style="width:100%"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
        var spanprogressbarinfo_el = $(progressinfo_el);

        $("#" + currentIDparam).append(spanrow_el.html(spancontainer_el.html(spanprogresshorizontal_el.html(spanprogressbarinfo_el))));
        
        var ee_text = $('<p style="margin-left:-105px; font-weight:bold"/>').text("EE");
        var el_text = $('<p style="margin-left:-105px; font-weight:bold"/>').text("EL");
        var ptag_processName = $('<p class="text_process_name" style="margin-top:-10px; font-weight:bold"/>').text(display_process_name);

        $("#" + currentIDparam).append(divprocessName.append(ee_text));
        $("#" + currentIDparam).append(divprocessName.append(el_text));
        $("#" + currentIDparam).append(divprocessName.append(ptag_processName));
       

        var spancol_output = $('<span style="margin-left:126px; margin-top:-98px;"/>').attr({ 'class': 'col-md-2 output_percentage_progress' });
        var spancontainer_output = $('<span />').attr({ 'class': 'container' });
        var spanprogressvertical_output = $('<span />').attr({ 'class': 'progress vertical rightcontainer' });
        var progressinfo_output = "";


        if (mOutput_arr.length == 1) {
            $(function () {

                $.ajax({
                    type: "GET",
                    url: "../bootstrap-3.3.5-libs/css/bootstrap-theme.min.css",
                    dataType: "script",
                    cache: true
                });

                var modifiedbar = $(".progress-bar-success");
                modifiedbar.css({ "background-color": mOutput_arr[0].colorcode });
            });
            progressinfo_output += '<span class="progress-bar progress-bar-success" style="width:100%" title="' + mOutput_arr[0].name + ' : ' + mOutput_arr[0].qty + ' ' + mOutput_arr[0].unit + '"><span class="text_output_percentage" style="color:black; font-weight:bold">100%</span></span>';
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
                $(function () {

                    $.ajax({
                        type: "GET",
                        url: "../bootstrap-3.3.5-libs/css/bootstrap-theme.min.css",
                        dataType: "script",
                        cache: true
                    });

                    var modifiedbar = $(".progress-bar-success");
                    modifiedbar.css({ "background-color": mOutput_arr[x].colorcode });
                });
                progressinfo_output += '<span class="progress-bar progress-bar-success" style="width:' + totalPer[x] + '%" title="' + mOutput_arr[x].name + ' : ' + mOutput_arr[x].qty + ' ' + mOutput_arr[x].unit + '"><span class="text_output_percentage" style="color:black; font-weight:bold">' + totalPer[x] + '%</span></span>';
                x++;
               
            }
        }

        var spanprogressbarinfo_output = $(progressinfo_output);
        $("#" + currentIDparam).append(spancol_output.html(spancontainer_output.html(spanprogressvertical_output.html(spanprogressbarinfo_output))));


        for (var i = 0; i < eInput_arr.length; i++)
        {
            var energyflow = $('<div style="height:' + eInput_arr[i].qty + 'px"/>').attr({ 'class': 'corner' }).text(eInput_arr[i].name);
            $("#sankey").append(energyflow);
            $(".corner").draggable({
                containment: "#sankey"
            });
        }


        if (mInputTotal === mOutputTotal)
        {
            $("#" + currentIDparam).removeClass('dashed-progress').addClass('complete-progress');
            $("#noti-process").find(".alert-danger").hide();
            $("#noti-process").find(".alert-success").show();
        }
        else
        {
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
        }
    }
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
   
    $("#sankey").selectable();

    $(".draggable").draggable({
        appendTo: '#sankey',
        containment: "window",
        cursor: 'move',
        revertDuration: 400,
        revert: 'invalid',
        helper: 'clone',
        obstacle: ".draggable",
        preventCollision: true

    });

    $(".draggable-material").draggable({
        appendTo: '#sankey',
        containment: "window",
        cursor: 'move',
        revertDuration: 400,
        revert: 'invalid',
        helper: 'clone',
        obstacle: ".draggable-material",
        preventCollision: true

    });

    /*
    function dragStart(event) {
        var el = $(this);

        event.originalEvent.dataTransfer.effectAllowed = 'move';
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));

        el.addClass('dragging');
        setTimeout(function () { el.removeClass('dragging'); }, 0);
    }

    $('.draggable-material').on('dragstart', dragStart);
    */
    

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
    var newbox;
    var process_id_arr = [];
    window.count = 0;
    window.boxNo = 0;


    $("#sankey").droppable({
        activeClass: "active",
        hoverClass: "hover",
        //accept: ".draggable",
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

                    window.instance = window.jsp = jsPlumb.getInstance({
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

                     window.connectorPaintStyle = {
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
                            //connection.getOverlay("label").setLabel("hello");
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

                    instance.batch(function (connection) {
                        for (var i = 0; i < process_id_arr.length; ) {
                            window.boxNo = ++i;
                            var str = "Window" + window.boxNo;
                            _addEndpoints(str, ["LeftMiddle", "RightMiddle", "TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle", "TopCenter", "BottomCenter"]);
                        }

                        instance.bind("connection", function (connInfo, originalEvent) {
                            init(connInfo.connection);
                        });

                        instance.connect({ uuids: [null], editable: true });

                        instance.draggable(jsPlumb.getSelector("#" + window.getcurrentID()), { grid: [0, 0] });

                        instance.bind("click", function (conn, originalEvent) {
                            //conn.toggleType("basic");
                            console.log("connection id on click " + conn.id); // con_52
                            $("#myModal7").modal('show');

                        });

                        instance.bind("connectionDrag", function (connection) {
                            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
                 
                        });

                        instance.bind("connectionDragStop", function (connection) {
                           
                            console.log("connection " + connection.id + " was dragged");
                        });

                        instance.bind("connectionMoved", function (params) {
                            alert("Connection ID" + params.connection.id);
                            console.log("connection " + params.connection.id + " was moved");
                        });
                    });
                    
                    jsPlumb.fire("jsPlumbDemoLoaded", instance);

                });
                /* Plumb */
            }
            
            for (var i = 0; i < process_id_arr.length; i++) {
                $("#" + process_id_arr[i]).draggable(
                    {
                        containment: '#sankeys',
                        cursor: 'move'
                    });
            }
        }
    });

    $(document).on('click', 'div.materialflowarrow', function () {
        $("#myModal6").modal('show');
    });

    

    // ddbchange tag
    $(document).on('change', '#ddbInputProcess', function () {
        var selectedInputID = $('#ddbInputProcess').val();
        var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

        if (returnObjArr != null) {
            for (var i = 0; i < returnObjArr.length; i++) {
                var obj = JSON.parse(returnObjArr[i]);
                if (obj.current_id === selectedInputID) {
                    var current_mOutput_arr = JSON.parse(JSON.stringify(obj.mOutput_obj_arr));
                    if (current_mOutput_arr.length !== 0) {
                        $(".mInputModalName").empty();
                        var newOption = $('<option>');
                        newOption.attr('value', "").text("SELECT MATERIAL");
                        $(".mInputModalName").append(newOption);
                        for (var j = 0; j < current_mOutput_arr.length; j++) {
                          
                            var newOption = $('<option>');
                            newOption.attr('value', current_mOutput_arr[j].name).text(current_mOutput_arr[j].name);
                            $(".mInputModalName").append(newOption);
                        }
                    }
                    else {
                        //  alert("Underfined Material Inputs");
                    }
                    break; // critical for time efficiency
                }
            }
        }
    });

    $(document).on('change', '#ddbOutputProcess', function () {
      
    });


    $(document).on('click', '#btnMaterialSourceSave', function () {
      
        var inputProcessId = $('#ddbInputProcess').val();
        var outputProcessId = $('#ddbOutputProcess').val();
       // alert("input/output Process ID : " + inputProcessId+" , "+outputProcessId);
        var mInputArrModal = [];

        for (var i = 0; i <= mInputModalIndex; i++) {
            alert("enter loop " + i);
            var mInputModalObj = { 'name': $("[name='mInputModal[" + i + "].name']").val(), 'qty': $("[name='mInputModal[" + i + "].qty']").val(), 'unit': $("[name='mInputModal[" + i + "].unit']").val() };
            mInputArrModal[i] = mInputModalObj;
        }

       // alert(JSON.stringify(mInputArrModal));

        var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

        if (returnObjArr != null) {
            for (var i = 0; i < returnObjArr.length; i++) {
                var obj = JSON.parse(returnObjArr[i]);

                if (obj.current_id === outputProcessId) {

                  //  alert("bef" + JSON.stringify(obj.mInput_obj_arr));
                    
                  

                    obj.mInput_obj_arr = $.merge(obj.mInput_obj_arr, mInputArrModal);

                  //  alert("aft" + JSON.stringify(obj.mInput_obj_arr));

                    returnObjArr[i] = JSON.stringify(obj);
                
                    localStorage.setItem("processObjStorage", JSON.stringify(returnObjArr));

                    var real_process_name = "";
                    var display_process_name = "";
                    var type_of_process_arr = [];
                    var process_desc = "";
                    var mInput_arr = [];
                    var mOutput_arr = [];
                    var eInput_arr = [];

                    var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));

                   

                    if (returnObjArr != null) {
                        for (var i = 0; i < returnObjArr.length; i++) {
                            var obj = JSON.parse(returnObjArr[i]);
                            
                          //  alert("Current ID, OutputProcessID " + obj.current_id + " , " + outputProcessId);

                            if (obj.current_id === outputProcessId) {

                              //  alert("new modified Obj Arr " + JSON.stringify(obj));

                                real_process_name = obj.real_process_name;
                                display_process_name = obj.display_process_name;
                                type_of_process_arr = obj.process_names;
                                process_desc = obj.process_desc;
                                mInput_arr = obj.mInput_obj_arr;
                                mOutput_arr = obj.mOutput_obj_arr;
                                eInput_arr = obj.eInput_obj_arr;

                                var mInputTotal = 0;
                                var mOutputTotal = 0;
                                var eInputTotal = 0;
                                var bootstrap_color = ["primary", "success", "info", "warning", "danger"];

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

                                var spancol_input = $('<span style="margin-left:-46px; margin-top:9px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
                                var spancontainer_input = $('<span />').attr({ 'class': 'container' });
                                var spanprogressvertical_input = $('<span />').attr({ 'class': 'progress vertical leftcontainer' });
                                var progressinfo_input = "";

                                if (mInput_arr.length == 1) {
                                    progressinfo_input += '<span class="progress-bar progress-bar-info" style="width:100%" title="' + mInput_arr[0].name + ' : ' + mInput_arr[0].qty + ' ' + mInput_arr[0].unit + '"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
                                }
                                else {
                                    var totalNum = 0;
                                    var totalPer = [];

                                    for (var j = 0; j < mInput_arr.length; j++) {
                                        totalNum += parseFloat(mInput_arr[j].qty);
                                    }

                                    for (var k = 0; k < mInput_arr.length; k++) {
                                        totalPer[k] = (100 * (mInput_arr[k].qty / totalNum)).toPrecision(3);
                                        //alert(totalPer[i] + "%");
                                    }
                                    var x = 0;
                                    while (totalPer[x] != null && mInput_arr[x] != null) {
                                        //alert(totalPer[x] + "%" + bootstrap_color[x % bootstrap_color.length]);
                                        progressinfo_input += '<span class="progress-bar progress-bar-success" style="width:' + totalPer[x] + '%" title="' + mInput_arr[x].name + ' : ' + mInput_arr[x].qty + ' ' + mInput_arr[x].unit + '"><span class="text_input_percentage" style="color:black; font-weight:bold">' + totalPer[x] + '%</span></span>';
                                        x++;
                                    }
                                }

                                var spanprogressbarinfo_input = $(progressinfo_input);
                                $("#" + outputProcessId).html(spancol_input.html(spancontainer_input.html(spanprogressvertical_input.html(spanprogressbarinfo_input))));

                                var divprocessName = $('<div style="margin-left:33px; margin-top:-95px;"/>').attr({ 'class': 'col-md-8' });

                                var spanrow_ee = $('<span style="margin-left:50px; margin-top:-20px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
                                var spancontainer_ee = $('<span />').attr({ 'class': 'container' });
                                var spanprogresshorizontal_ee = $('<span />').attr({ 'class': 'progress horizontal-process leftcontainer' });
                                var progressinfo_ee = '<span class="progress-bar progress-bar-info" style="width:100%"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
                                var spanprogressbarinfo_ee = $(progressinfo_ee);

                                $("#" + outputProcessId).append(spanrow_ee.html(spancontainer_ee.html(spanprogresshorizontal_ee.html(spanprogressbarinfo_ee))));


                                var spanrow_el = $('<span style="margin-left:-33px; margin-top:10px;"/>').attr({ 'class': 'col-md-2 input_percentage_progress' });
                                var spancontainer_el = $('<span />').attr({ 'class': 'container' });
                                var spanprogresshorizontal_el = $('<span />').attr({ 'class': 'progress horizontal-process leftcontainer' });
                                var progressinfo_el = '<span class="progress-bar progress-bar-info" style="width:100%"><span class="text_input_percentage" style="color:black; font-weight:bold">100%</span></span>';
                                var spanprogressbarinfo_el = $(progressinfo_el);

                                $("#" + outputProcessId).append(spanrow_el.html(spancontainer_el.html(spanprogresshorizontal_el.html(spanprogressbarinfo_el))));

                                var ee_text = $('<p style="margin-left:-105px; font-weight:bold"/>').text("EE");
                                var el_text = $('<p style="margin-left:-105px; font-weight:bold"/>').text("EL");
                                var ptag_processName = $('<p class="text_process_name" style="margin-top:-10px; font-weight:bold"/>').text(display_process_name);

                                $("#" + outputProcessId).append(divprocessName.append(ee_text));
                                $("#" + outputProcessId).append(divprocessName.append(el_text));
                                $("#" + outputProcessId).append(divprocessName.append(ptag_processName));


                                var spancol_output = $('<span style="margin-left:126px; margin-top:-98px;"/>').attr({ 'class': 'col-md-2 output_percentage_progress' });
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
                                        progressinfo_output += '<span class="progress-bar progress-bar-success" style="width:' + totalPer[x] + '%" title="' + mOutput_arr[x].name + ' : ' + mOutput_arr[x].qty + ' ' + mOutput_arr[x].unit + '"><span class="text_output_percentage" style="color:black; font-weight:bold">' + totalPer[x] + '%</span></span>';
                                        x++;
                                    }
                                }

                                var spanprogressbarinfo_output = $(progressinfo_output);
                                $("#" + outputProcessId).append(spancol_output.html(spancontainer_output.html(spanprogressvertical_output.html(spanprogressbarinfo_output))));


                                for (var i = 0; i < eInput_arr.length; i++) {
                                    var energyflow = $('<div style="height:' + eInput_arr[i].qty + 'px"/>').attr({ 'class': 'corner' }).text(eInput_arr[i].name);
                                    $("#sankey").append(energyflow);
                                    $(".corner").draggable({
                                        containment: "#sankey"
                                    });
                                }


                                if (mInputTotal === mOutputTotal) {
                                    $("#" + outputProcessId).removeClass('dashed-progress').addClass('complete-progress');
                                    $("#noti-process").find(".alert-danger").hide();
                                    $("#noti-process").find(".alert-success").show();
                                }
                                else {
                                    $("#" + outputProcessId).removeClass('complete-progress').addClass('dashed-progress');
                                    $("#noti-process").find(".alert-success").hide();
                                    $("#noti-process").find(".alert-danger").show();
                                }
                                
                                break;
                            }
                        }
                    }

                    break;
                }
            }
        }




       






        /*for (var i = 0; i <= mOutputModalIndex; i++) {
            //alert("Name: " + $("[name='mOutput[" + i + "].name']").val() + ", Qty:" + $("[name='mOutput[" + i + "].qty']").val() + ", Unit: " + $("[name='mOutput[" + i + "].unit']").val());
            var mOutputModalObj = { 'name': $("[name='mOutputModal[" + i + "].name']").val(), 'qty': $("[name='mOutputModal[" + i + "].qty']").val(), 'unit': $("[name='mOutputModal[" + i + "].unit']").val() };
            mOutput_arr[i] = mInputModalObj;
        }*/

    });
    // tag now
    $(document).on('click', '#btnChooseContinue', function () {
        var checkOption = $('input[name=rdoChooseModal]:checked').val();

        if (checkOption === "material")
        {
            $("#ddbInputProcess").empty();
            $("#ddbOutputProcess").empty();


            var newOption = $('<option>');
            newOption.attr('value',"").text("SELECT HERE");
            $("#ddbInputProcess").append(newOption);

            var newOption = $('<option>');
            newOption.attr('value', "").text("SELECT HERE");
            $("#ddbOutputProcess").append(newOption);

            var returnObjArr = JSON.parse(localStorage.getItem("processObjStorage"));
            if (returnObjArr != null) {
                for (var i = 0; i < returnObjArr.length; i++) {
                    var obj = JSON.parse(returnObjArr[i]);

                    var newOption = $('<option>');
                    newOption.attr('value', obj.current_id).text(obj.display_process_name);
                    $("#ddbInputProcess").append(newOption);

                    var newOption = $('<option>');
                    newOption.attr('value', obj.current_id).text(obj.display_process_name);
                    $("#ddbOutputProcess").append(newOption);
                  
                }
            }
            
            $("#myModal6").modal('show');
        }
        else
        {
            $("#myModal5").modal('show');
        }
    });

    $("div.materialflowarrow").draggable({
        cursor: 'move'
    });
    
    

    /* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */
});






