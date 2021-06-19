//VARIÁVEIS COM DADOS PARA CONDIÇÕES BÁSICAS
let val = 0;
let parcelas = 0;   
 
//OPÇÕES DE EMPRÉSTIMOS
$('#opt2').on("click", valores);                                     
$('#opt5').on("click", valores);
$('#opt10').on("click", valores);
$('#opt20').on("click", valores);

//OPÇÕES DE PARCELAMENTO
$('#opt12').on("click", parcel);
$('#opt24').on("click", parcel);
$('#opt36').on("click", parcel);
$('#opt48').on("click", parcel);

//ATRIBUINDO VALORES DOS BOTÕES PARA A VARIÁVEL
function valores(){                 
    val = Number( $(this).val() );
    $(this).attr("disabled", true);            
};
function parcel(){
    parcelas = Number( $(this).val() );
    $(this).attr("disabled", true);
};

//ADICIONANDO NOVO INPUT PARA OPÇÕES DIFERENTES DAS OFERECIDAS (CRÉDITO E PARCELAS)
$('#add').click(function(){                                                
    $('#lista_opcoes').append('<input id="opt" type="number" placeholder="R$"></input><button id="ok">Ok</button>')         
    $('#add').attr("disabled", true); 
    $('#opt').focus();    
    $('#ok').attr("class", 'btn btn-outline-success');     
    $('#ok').click(function(){
        val = Number(  $('#opt').val() );
    });                                                                 
});
$('#add_2').click(function(){                                            
    $('#lista_parc').append('<input id="optParcel" type="number"></input><button id="ok2">Ok</button>')         
    $('#add_2').attr("disabled", true);
    $('#optParcel').focus(); 
    $('#ok2').attr("class", 'btn btn-outline-success');        
    $('#ok2').click(function(){
        parcelas = Number( $('#optParcel').val() );         
    });                                                                    
});

//BOTÃO 'SIMULAR' IMPRIME NA TELA OPÇÕES DE PAGAMENTO E VALOR DE PARCELAS
$(document).ready(function() { $('#nova').hide(); $('#box_3').hide(); $('#box_4').hide()});
$('#simular').click(function(){
    $('#simular').attr("disabled", true);
    $('#lista_parc').append( '<div>Empréstimo solicitado: R$'+ val + '<span>,00 Em: </span>' + parcelas + 'x de '
     + taxasJuros(val, parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '</div>');
    $('#nova').show();
    
//OCULTANDO BOX_1 -> LEVANDO O USUÁRIO A ÁREA DE CADASTRO
    $('#rodape').append('<button id="solicitar">Solicitar</button>');
    $('#solicitar').attr("class", 'btn btn-outline-success');
    $('#solicitar').click(function(){
        if(val === 0) {
            alert('[ERRO] Insira um valor para solicitação');
        } else {
            $('#box_1').hide();
        };  
    });  
});

// REVISÃO FINAL
$('#cadastrar').click(function(){
//DADOS DO CLIENTE
    let nome = $('#nome').val();
    let cpf = $('#cpf').val();
    let renda = Number( $('#renda').val() );
    let salario = renda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let pRenda = (renda / 100) * 50;                                                                                         //Porcentagem de renda para validação do empréstimo    
    let valorFinal = (taxasJuros(val,parcelas) * parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); //Valor total do empréstimo com juros;
    if(pRenda < taxasJuros(val, parcelas)){                                                                                 //Condição para verificar se valor da parcela é menor que 50% do salário
        alert('Crédito negado. Infelizmente sua renda mensal é muito baixa!');
    } else {
        $('#box_2').hide();
//SAÍDA NA TELA
        $('#box_3').show(); 
        $('#box_4').show();
        $('#p1').text('Nome: ' + nome);      
        $('#p2').text('CPF: ' + cpf);
        $('#p3').text('Salário: ' + salario);
        $('#p4').text('Crédito disponível com taxas adicionais: ' + valorFinal);
        $('#p5').text('Em ' + parcelas + ' Parcelas fixas de ' + taxasJuros(val, parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })); 
//ULTIMA BOX COM AGRADECIMENTO
        $('#finalizar').click(function(){   
            let valorFinal = (taxasJuros(val,parcelas) * parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });   
            $('#box_3').remove();
            $('#box_4').append('<h1>Crédito solicitado com sucesso!</h1>');
            $('#box_4').append('<p>Valor solicitado: ' + val + ' *Disponível em conta em até 24horas.</p>');
            $('#box_4').append('<h3>Obrigado por escolher o Serasa!</h3>');
        });
    }; 
});

//CALCULANDO JUROS A PARTIR DO NÚMERO DE PARCELAS
function taxasJuros(emprestimo, parcelas){      
    let financiamento = emprestimo / parcelas;
    if(parcelas < 12){
        financiamento += (emprestimo / 100) * 1;
    } else if(parcelas >= 12 && parcelas < 24){
        financiamento += (emprestimo / 100) * 1.25;
    } else if(parcelas >= 24 && parcelas < 36){
        financiamento += (emprestimo / 100) * 1.5;
    } else if(parcelas >= 36 && parcelas < 48){
        financiamento += (emprestimo / 100) * 1.75;
    } else if (parcelas >= 48 && parcelas < 60){
        financiamento += (emprestimo / 100) * 2.0;
    } else{
        financiamento += (emprestimo / 100) * 2.20;
    }   
    return financiamento;
};    

