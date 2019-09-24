$(document).ready(function() {
  $.ajaxSetup({
    async: false
  });
  var i = 0;
  $('#add').click(function() {
    i++;
    //console.log(i);

    var newRow = '<div class="form-row align-items-center" id="row' + i + '"><div class="form-group col-md-6"><select id="el-select-' + i + '"class="form-control name_list" label="Solute"><option value="-1">--Please choose an solute element--</option><option value="Al">Aluminium</option><option value="C" >C</option><option value="Co">Co</option><option value="Cr">Cr</option><option value="Mn">Mn</option><option value="Mo">Mo</option><option value="Ni">Ni</option><option value="P">P</option><option value="S">S</option><option value="Si">Si</option><option value="Ti">Ti</option><option value="V">V</option></select></div><div class="form-group col-md-5"><input value=0 type="number" id="quantity-' + i + '" name="quantity[]" placeholder="quantity" class="form-control name_list amountinput" step="0.01" value="1" min="0" max="50"/></div><div class="form-group col-md-1 text-center"><button type="button" name="remove" id="' + i + '" class="btn btn-danger btn_remove ">X</button></div></div></div></div>'

    $('#articles').append(newRow);
  });


  $(document).on('click', '.btn_remove', function() { //usunięcie rządku
    var button_id = $(this).attr("id");
    $('#row' + button_id + '').remove();
    $('#quantity-' + button_id + '').remove();
    $('#el-select-'+ button_id + '').remove();
    $('#'+ button_id).remove();
    i--;
  });

  var TLsub = 0;
  function MM1(el,qty){
    TLsub = 0;
    var qty1 = parseFloat(qty);
    var qty01 = qty1.toFixed(2);
    var qty001 = parseFloat(qty01)
    var qty2 = qty001.toPrecision(10).replace(/0+$/,"");
    if(qty2.endsWith(".")){qty2=qty2+"0"};
    //console.log(qty2);
    //console.log(typeof qty2);

    $.getJSON("json/"+el+".json",function(json){

    //console.log(typeof qty01)

    TLsub = json[el][qty2];
    if (TLsub == null) {alert("błędna wartość TLsub, błędny wprowadzony zakres pierwiastka"+el)};
    //console.log(TLsub +' to jest tlsub');
    })}
   var submitClickAmount = 0
  $('#submit').click(function() {
    var qty = $('#quantity-' + i).val();
    var aX = 0;
    R1Base = 1539;
    HW1Base = 1537;
    MM1Base = 1537.9;

    var el = $("#el-select-" + i).val();
    var algSel = $("#alg-select").val();
    var u;
    for (u=0; u <= i; u++ ){
      var qty = $('#quantity-' + u).val();
      var el = $("#el-select-" + u).val();
      var algSel = $("#alg-select").val();
      MM1(el,qty);

      console.log(u);
      switch (algSel) {
        case "R1":
          switch(el){
            case "C":
              if(qty > 0 && qty <=0.5){
                aX = 65;
                break;
              }
              else if (qty > 0.51 && qty <=1){
                aX = 70;
                break;
              }
              else if (qty > 1.01 && qty <=2){
                aX = 75;
                break;
              }
            case "Mn":
              aX = 5;
              break;
            case "Si":
              aX = 8;
              break;
            case "P":
              aX = 30;
              break;
            case "Co":
              aX = 2;
              break;
            case "S":
              aX = 25;
              break;
            case "Ni":
              aX = 4;
              break;
            case "Cr":
              aX = 1.5;
              break;
            case "Mo":
              aX = 2;
              break;
            case "Ti":
              aX = 5;
              break;
            case "Al":
              aX = 0;
              break;
            case "V":
              aX = 2;
              break;
            default:
              alert("Please select solute element");
              break;
              }
              break;
        case "C1":
            switch(el){
              case "C":
                if(qty > 0 && qty <=0.51){
                  aX = 90.4;
                  break;
                }
                else if (qty > 0.52 && qty <=2){
                  aX = 65;
                  break;
                }
              case "Mn":
                aX = 5;
                break;
              case "Si":
                aX = 8;
                break;
              case "P":
                aX = 34;
                break;
              case "Co":
                aX = 2;
                break;
              case "S":
                aX = 40;
                break;
              case "Ni":
                aX = 4;
                break;
              case "Cr":
                aX = 1.5;
                break;
              case "Mo":
                aX = 2;
                break;
              case "Ti":
                aX = 5;
                break;
              case "Al":
                aX = 0;
                break;
              case "V":
                aX = 2;
                break;
              default:
                alert("Please select solute element");
                break;
                }
                break;
        case "HW1":
          //console.log(el + ' '+ qty);
          switch(el){
            case "C":
              if(qty > 0 && qty <=0.471){
                aX = 87*qty;
                break;
              }
              else if (qty > 0.478 && qty <=1){
                aX = 70*qty-8;
                break;
              }
              else if (qty > 1.01 && qty <=2){
                aX = 76*qty-2;
                break;
              }
            case "Mn":
              aX = 5;
              break;
            case "Si":
              if(qty>=1){
                aX = (qty*qty)-(9*qty)+1
                break;
              }
              else
              aX = 8; // wartość domyślna
              break;
            case "P":
              aX = 34;
              break;
            case "S":
              aX = 40;
              break;
            case "Co":
              aX = 2;
              break;
            case "Ni":
              if(qty=>0 && qty <=4.4)
              {
                aX = 5*qty
                break;
              }
              else {
                aX = (1.92*qty)-13.54
                break;
              }
            case "Cr":
              aX = (0.473*qty)-(0.208*(qty**2))+(0.0123*(qty**3))-(0.00018*(qty**4));
              break;
            case "Mo":
              aX = 2.5;
              break;
            case "Ti":
              aX = 15;
              break;
            case "Al":
              aX = 0;
              break;
            case "V":
              if(qty=>0 && qty <=1){
                aX = 3*qty
                break;
              }
              else if(1<=qty<=2){
                aX = (4*qty)+1
                break;
              }
              else aX = (3*qty)+1
              break;
            default:
              alert("Please select solute element");
              break;
              }
              break;
        case "MM1":
                    break;
        default:
          break;
          }
      //console.log(algSel)
      if(algSel === "R1" || algSel ==="C1"){
        R1Base = R1Base - aX * qty;
        //console.log (R1Base);
        resultR1 = R1Base.toPrecision(6)
        resultTable = resultR1;
      }
      else if(algSel ==="HW1"){
        HW1Base = HW1Base - aX;
        resultTable = HW1Base.toPrecision(6);
      }
      else if(algSel==="MM1"){
          //console.log(u);
          //console.log (MM1Base);
          //console.log (TLsub);
          MM1Base = MM1Base - (1537.9 - TLsub);
          var algSelText = $("#alg-select :selected").text();
          resultTable = MM1Base.toPrecision(6);

      }
      else if(algSel ==="Nothing"){
        alert("Please select algorithm to calculate TL");

      }
      //console.log(submitClickAmount);
    }
      if (algSel !="Nothing" && qty !="0" && el !="-1"){submitClickAmount++; createTable(i,el,qty,algSelText,resultTable);}
      if (qty =="0" && el !="-1"){alert("Please specify amount of solute element")};
    function createTable(i,el,qty,algSelText,resultTable){
      var tableSolution = ''
      var tableComposition = ''
      for (var u=0;u <= i; u++ ){
        var el = $("#el-select-" + u).val();
        tableComposition +='<td>'+el+'&#37'+'</td>'}
      if(algSelText==="MM Caster"){
        for (var u=0;u <= i; u++ ){
          var qty = parseFloat($('#quantity-' + u).val()).toFixed(2);
          tableSolution += '<td>'+qty+'</td>'
        }
      }
      else{
      for (var u=0;u <= i; u++ ){
        var qty = $('#quantity-' + u).val();
        tableSolution += '<td>'+qty+'</td>'
      }}
      //console.log(tableSolution);
      var algSelText = $("#alg-select :selected").text();
      var tableHead = '<table id="tablePreview" class="table table-bordered"><thead><tr><th scope="col" rowspan="1">#</th><th scope="col" rowspan="1">Algorithm</th><th scope="col" colspan="'+(i+1)+'"id="Composition">Composition</th><th scope="col" rowspan="1">Temperature Liquidus</th></tr></thead>'
      var algSelTable = '<tbody class="text-center"><tr><th scope="row" rowspan="2">'+submitClickAmount+'</td><td rowspan="2">'+ algSelText +'</td>'
      var tableResults = '<td rowspan="2">'+resultTable+'&#8451'+'</td></tr>'
      var tableSolutionRowstart ='<tr>'
      var tableSolutionRowend ='</tr></tbody></tbody></table>'
      $('#resultTable').append(tableHead+algSelTable+tableComposition+tableResults+tableSolutionRowstart+tableSolution+tableSolutionRowend);
    }
  }
  );
});