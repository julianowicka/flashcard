$(document).ready(function() {

    /*$('.flashcard').on('click', function()
      {
        $(this).slideUp('400',function()
          {
            $(this).slideDown('400');
          });
      });*/
    var questionAnswer = [ //['Kliknij', 'Zaczynasz naukę'],
        ['question 1', 'answer 1'],
        ['question 2', 'answer 2'],
        ['question 3', 'answer 3']
    ];

    var reviewTable = [
        ['Rewiew', 'otherAnwser']
    ];
    var flash = $('.card');
    var card = $('.flashcard').find('.front, .back');
    var questionInputs = $('.inputForm').find('input');
    var addQuestion = $('.inputForm').find('button'); //.find('#dodaj');
    console.log(questionAnswer.length)
    var j = 0;
    var handler = false;
    var dontAddThis = true;

    $('.flashcard').find('.back').css('display', 'none');
    var cleanTable = function(array, q) {
        var lgt = array.length;

        var hold1 = array[q][0];
        var hold2 = array[q][1];
        for (var i = q; i < lgt; i++) {
            if (i + 1 < lgt) {
                array[q][0] = array[i + 1][0];
                array[q][1] = array[i + 1][1];
                q++
            } else {
                array[lgt - 1][0] = hold1;
                array[lgt - 1][1] = hold2;
                array.pop();
            }
        }
    }
    $('.btns').find('button').each(function(i) {
        $(this).on('click', function() {
            switch (i) {
                case 0:
                    if (handler == false) {
                        if (card.eq(0).text().trim() == 'Kliknij')
                        //console.log(card.eq(0).text());
                            break;
                        console.log('dodano do powtorki');
                        // reviewTable.push[questionAnswer[j][0], questionAnswer[j][1]];
                        reviewTable.push([$('.front').find('p').text(), $('.back').find('p').text()]); //questionAnswer[j][0], questionAnswer[j][1]);
                        console.log($('.front').find('p').text() + " " + $('.back').find('p').text()); //questionAnswer[j][0]+" "+" "+ questionAnswer[j][1]+" j:"+j);
                        break;
                    } else {
                        alert('To pytanie jest już w powtórce');
                        break;
                    }

                case 1:
                    if (handler == true) {
                        alert('Jestes właśnie w trybie powtórki');
                        break;
                    } else
                        handler = true;

                    console.log('zaczeto powtorke');
                    card.off();
                    flash.fadeOut('400', function() {

                        card.eq(0).find('p').text('Kliknij'); //reviewTable[0][0]);
                        card.eq(1).find('p').text('Zaczynasz powtórkę'); //reviewTable[0][1]);
                        arrays(reviewTable);
                        flash.fadeIn('400');
                    });
                    break;

                  case 2:
        if(handler == true)
          {
            if(reviewTable.length == 0)
            {
              alert('W powtorce nie ma nic do usuniecia');
              flash.fadeOut('400', function()
              {
                arrays(questionAnswer);
                card.eq(0).find('p').text('B111rak pytan w powtorce');//questionAnswer[0][0]);
                card.eq(1).find('p').text('Wracasz do domyslnego trybu');//questionAnswer[0][1]);
                flash.fadeIn('400');
              });
              break;
            }
            else
            {
 
            console.log('Usunieto z powtorki');
            console.log(reviewTable[j][0]+" "+reviewTable[j][1]);
                reviewTable.splice(j,1);
                //cleanTable(reviewTable,j);
                //
                if(reviewTable.length != 0)
                {
                  flash.fadeOut('400', function()
                  {
                    arrays(reviewTable);
                    card.eq(0).find('p').text('pytanie usuniete');//reviewTable[0][0]);
                    card.eq(1).find('p').text('kliknij');
                    flash.fadeIn('400');
                  });
 
              }
                else
                {
                  flash.fadeOut('400', function()
                  {
                    card.off();
                    handler=false;
                    arrays(questionAnswer);
                    card.eq(0).find('p').text('Bra222k pytan w powtorce');//questionAnswer[0][0]);
                    card.eq(1).find('p').text('Wracasz do domyslnego trybu');//questionAnswer[0][1
                    flash.fadeIn('400');
                  });
                }
            }
          }
 
        break;
                case 3:
                    if (handler == true) {
                        handler = false;
                        console.log('Skoncz powtorke');
                        card.off();
                        flash.fadeOut('400', function() {
                            card.eq(0).find('p').text('Kliknij'); //questionAnswer[0][0]);
                            card.eq(1).find('p').text('Wracasz do nauki'); //questionAnswer[0][1]);
                            arrays(questionAnswer);
                            flash.fadeIn('400');
                        });
                        break;
                    } else {
                        alert('Powtorka zostala juz zakonczona');
                        break;
                    }
            }
        });
    });


    var arrays = function(myArray) {

        j = 0;
        card.each(function(i) {
            $(this).on('click', {
                value: j
            }, function() {
                var arrayLength = myArray.length;
                switch (i) {
                    case 0:
                        flash.slideUp('400');
                        $(this).slideUp('400', function() {
                            card.eq(1).slideDown('400');
                            flash.slideDown('400');
                        });
                        break;

                    case 1:
                        flash.slideUp('400');
                        $(this).slideUp('400', function() {
                            card.eq(0).slideDown('400');
                            flash.slideDown('400');
                            card.eq(0).find('p').text(myArray[j][0]);
                            card.eq(1).find('p').text(myArray[j][1]);
                            j++;
                            if (j == arrayLength)
                                j = 0;
                            console.log(j);
                        });
                        break;
                }
            });
        });
    }

    addQuestion.on('click', function() {
        //e.preventDefault();
        console.log('ev dziala');
        if (questionInputs.eq(0).val().trim() != "" | questionInputs.eq(1).val().trim() != "") {
            var a = questionInputs.eq(0).val().trim();
            var b = questionInputs.eq(1).val().trim();
            questionAnswer.push([a, b]);
            console.log(questionInputs.eq(0).val().trim() + " " + questionInputs.eq(1).val().trim());
        }
    });

    /*
    card.one('click',function()
    {
       $(this).slideUp('400',function()
      {
        card.eq(1).slideDown('400');
        flash.slideDown('400')


      });
    });*/
    flash.hide();
    var begin = $('.begin');
    begin.on('click', function() {
        $(this).fadeOut('400');
        flash.fadeIn('400');
    });
    arrays(questionAnswer);
    //  questionAnswer.splice(0,1);
    // arrays(questionAnswer);


    //$('.holder').hover( function(){console.log(j)});
});


/*
function display(qTable)
 {
 }



document.addEventListener('DOMContentLoaded', function() {

    var form = document.getElementsByTagName('form')[0];

    var questionInput = form[0];
    var answerInput = form[1];


    form.addEventListener('submit', function(evt)
    {
        evt.preventDefault();
        questionAnswer.push([questionInput.value, answerInput.value]);
    });


});
/*
var i = 0;
var j = 0;

    if (j == 0)
    {
    document.getElementsByClassName('front')[0].innerHTML = '<p>' + qTable[i][j] + '</p>';
    j++;
    }

    else
    {
    document.getElementsByClassName('back')[0].innerHTML = '<p>' + qTable[i][j] + '</p>';
    j = 0;
        if (i == questionAnswer.length-1)
        {
            i = 0;
        }
        else
        {
            i++;
        }

    }

    //Dodaj do powtorki
    */
/*******************************************|||TESTY||||**********************************************
/*
$('.flashcard').on('click', function()
{
  display(questionAnswer);
  $('.flashcard').toggleClass('flipped');
});

$('.card').find('input').on('click',function(evt)
{
  evt.preventDefault();
//  var paragraphs = $('card').find('p');
  //reviewTable.push([paragraphs[0].text(),paragraphs[1].text
  //reviewTable.push([questionAnswer[i][0],questionAnswer[i][1]]);
  //console.log(reviewTable);
});*/
//$('.flashcard').slideUp('400');
/*  var card = $('.flashcard').find('.front, .back');
$('.flashcard').find('.back').css('display', 'none');
card.each(function(i)
{
  $(this).on('click',function()
  {
    switch(i)
    {
      case 0:
      $(this).slideUp('400',function()
        {
          card.eq(1).slideDown('400');
        });
      break;

      case 1:
      $(this).slideUp('400',function()
        {
          card.eq(0).slideDown('400');
        });
    }
  });

});


$('.btns').eq(0).on('click', function(e)
  {
  //  e.preventDefault();
  console.log('powinno dodac');
    reviewTable.push[questionAnswer[j][0], questionAnswer[j][1]];
  });

  $('.btns').eq(1).on('click', function(e)
    {
    //  e.preventDefault();
    console.log('Zacznij powtorke');
      arrays(reviewTable);
    });

    $('.btns').eq(2).on('click', function(e)
      {
      //  e.preventDefault();
      console.log('Usun z powtorki');
        reviewTable.push[questionAnswer[j][0], questionAnswer[j][1]];
      });
*************************************************************************************************************/
