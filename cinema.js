let cinema=[[true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true], [true, true, true, true, true]];//массив (внешняя скобка-кинотеатр, внутренняя-ряды в кинотеатре с количеством true-креслами)
let cinema_etalon=[[true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true], [true, true, true, true, true]];//массив с состояниями кресел
window.onload=function ()
{
init();
document.getElementById("sale").onclick=function ()
{
    sale();
}
document.getElementById("knopka").onclick=function ()
{
    search();
}
}
function init()//функция инициализации(отображения их)
{
    console.log(cinema.length);//количество рядов(5)
    for(let row=0; row<cinema.length; row++)
    {
        console.log(" ",cinema[row].length);// количество кресел в ряду(3 по 8, 6, 5)
        for(let chair=0; chair<cinema[row].length; chair++)
        {
            if(cinema[row][chair]==true)
            {
                document.getElementById("r"+(row+1)+"_"+(chair+1)).src="images/chair3.png";
                document.getElementById("r"+(row+1)+"_"+(chair+1)).title="Место свободно";
            }
            else
            {
                document.getElementById("r"+(row+1)+"_"+(chair+1)).src="images/chair2.png";
                document.getElementById("r"+(row+1)+"_"+(chair+1)).title="Место забронировано";
            }
        }
    }
}
function reserve(row,chair)//функция работы бронирования кресел(с зеленого в серый и обратно с серого на зеленый цвет)
{
    if(cinema_etalon[row - 1][chair - 1]==true) {
        if (cinema[row - 1][chair - 1] == true) {
            document.getElementById("r" + (row) + "_" + (chair)).src = "images/chair2.png";
            document.getElementById("r" + (row) + "_" + (chair)).title = "Местро забронировано";
            cinema[row - 1][chair - 1] = false;
        } else {
            document.getElementById("r" + (row) + "_" + (chair)).src = "images/chair3.png";
            document.getElementById("r" + (row) + "_" + (chair)).title = "Место свободно";
            cinema[row - 1][chair - 1] = true;
        }
    }
}
function sale()
{
    let total_sum=0;
    for(let row=0; row<cinema.length; row++)
    {
        for(let chair=0; chair<cinema[row].length; chair++) {
            if (cinema[row][chair] == false) {
                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).src = "images/chair1.png";
                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).title = "Место продано";
                cinema_etalon[row][chair] = false;
                if(row==cinema.length-1)
                {
                    total_sum+=50;
                }
                else if(row==0)
                {
                    total_sum+=120;
                }
                else
                {
                    if(chair==0 || chair==cinema[row].length-1)
                    {
                        total_sum+=80;
                    }
                    else
                    {
                        total_sum+=100;
                    }
                }
            }
        }
    }
    document.getElementById("cost").innerText="Кинотеатр заработал "+total_sum+" грн";
}
function search()
{
    let num=parseInt(document.getElementById("poisk").value)
    if(num>0 && num<=cinema[0].length)
    {
        let answer=false;
        switch (num) {
            case 2:
                for (let row = 0; row < cinema.length; row++) {
                    for (let chair = 0; chair < cinema[row].length; chair++) {
                        answer = optimize(num, row, chair);
                        if (answer == true) {
                            break;
                        }
                        /*if(cinema[row][chair]==true && cinema[row][chair+1]==true)
                        {
                            let msg="Кресло № "+(chair+1) + " , № "+(chair+2)+" свободно. Будете брать?";
                            answer=confirm(msg);
                            if (answer == true)
                            {
                                document.getElementById("r"+(row+1)+"_"+(chair+1)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+1)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+2)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+2)).title="Место продано";
                                cinema[chair]=cinema_etalon[chair]=false;
                                cinema[chair+1]=cinema_etalon[chair+1]=false;
                                break;
                            }
                        }*/
                    }
                    if (answer == true) {
                        break;
                    }
                }
                break;
            case 3:
                for (let row = 0; row < cinema.length; row++) {
                    for (let chair = 0; chair < cinema[row].length; chair++) {
                        if (cinema[row][chair] == true && cinema[row][chair + 1] == true && cinema[row][chair + 2] == true) {
                            let msg = "Кресло № " + (chair + 1) + " , № " + (chair + 2) + " , № " + (chair + 3) + " свободно. Будете брать?";
                            answer = confirm(msg);
                            if (answer == true) {
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).title = "Место продано";
                                cinema[chair] = cinema_etalon[chair] = false;
                                cinema[chair + 1] = cinema_etalon[chair + 1] = false;
                                cinema[chair + 2] = cinema_etalon[chair + 2] = false;
                                break;
                            }
                        }
                    }
                    if (answer == true) {
                        break;
                    }
                }
                break;
            case 4:
                for (let row = 0; row < cinema.length; row++) {
                    for (let chair = 0; chair < cinema[row].length; chair++) {
                        if (cinema[row][chair] == true && cinema[row][chair + 1] == true && cinema[row][chair + 2] == true && cinema[row][chair + 3] == true) {
                            let msg = "Кресло № " + (chair + 1) + " , № " + (chair + 2) + " , № " + (chair + 3) + " , № " + (chair + 4) + " свободно. Будете брать?";
                            answer = confirm(msg);
                            if (answer == true) {
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 4)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 4)).title = "Место продано";
                                cinema[chair] = cinema_etalon[chair] = false;
                                cinema[chair + 1] = cinema_etalon[chair + 1] = false;
                                cinema[chair + 2] = cinema_etalon[chair + 2] = false;
                                cinema[chair + 3] = cinema_etalon[chair + 3] = false;
                                break;
                            }
                        }
                    }
                    if (answer == true) {
                        break;
                    }
                }
                break;
            case 5:
                for (let row = 0; row < cinema.length; row++) {
                    for (let chair = 0; chair < cinema[row].length; chair++) {
                        if (cinema[row][chair] == true && cinema[row][chair + 1] == true && cinema[row][chair + 2] == true && cinema[row][chair + 3] == true && cinema[row][chair + 4] == true) {
                            let msg = "Кресло № " + (chair + 1) + " , № " + (chair + 2) + " , № " + (chair + 3) + " , № " + (chair + 4) + " , № " + (chair + 5) + " свободно. Будете брать?";
                            answer = confirm(msg);
                            if (answer == true) {
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 4)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 4)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 5)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 5)).title = "Место продано";
                                cinema[chair] = cinema_etalon[chair] = false;
                                cinema[chair + 1] = cinema_etalon[chair + 1] = false;
                                cinema[chair + 2] = cinema_etalon[chair + 2] = false;
                                cinema[chair + 3] = cinema_etalon[chair + 3] = false;
                                cinema[chair + 4] = cinema_etalon[chair + 4] = false;
                                break;
                            }
                        }
                    }
                    if (answer == true) {
                        break;
                    }
                }
                break;
            case 6:
                for (let row = 0; row < cinema.length; row++) {
                    for (let chair = 0; chair < cinema[row].length; chair++) {
                        if (cinema[row][chair] == true && cinema[row][chair + 1] == true && cinema[row][chair + 2] == true && cinema[row][chair + 3] == true && cinema[row][chair + 4] == true && cinema[row][chair + 5] == true) {
                            let msg = "Кресло № " + (chair + 1) + " , № " + (chair + 2) + " , № " + (chair + 3) + " , № " + (chair + 4) + " , № " + (chair + 5) + " , № " + (chair + 6) + " свободно. Будете брать?";
                            answer = confirm(msg);
                            if (answer == true) {
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 1)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 2)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 3)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 4)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 4)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 5)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 5)).title = "Место продано";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 6)).src = "images/chair1.png";
                                document.getElementById("r" + (row + 1) + "_" + (chair + 6)).title = "Место продано";
                                cinema[chair] = cinema_etalon[chair] = false;
                                cinema[chair + 1] = cinema_etalon[chair + 1] = false;
                                cinema[chair + 2] = cinema_etalon[chair + 2] = false;
                                cinema[chair + 3] = cinema_etalon[chair + 3] = false;
                                cinema[chair + 4] = cinema_etalon[chair + 4] = false;
                                cinema[chair + 5] = cinema_etalon[chair + 5] = false;
                                break;
                            }
                        }
                    }
                    if (answer == true) {
                        break;
                    }
                }
                break;
            case 7:
                for (let row = 0; row < cinema.length; row++) {
                    for (let chair = 0; chair < cinema[row].length; chair++) {
                        answer = optimize(num, row, chair);
                        if (answer == true) {
                            break;
                        }
                        /*if(cinema[row][chair]==true && cinema[row][chair+1]==true && cinema[row][chair+2]==true && cinema[row][chair+3]==true && cinema[row][chair+4]==true && cinema[row][chair+5]==true && cinema[row][chair+6]==true)
                        {
                            let msg="Кресло № "+(chair+1)+" , № "+(chair+2)+" , № "+(chair+3)+" , № "+(chair+4)+" , № "+(chair+5)+" , № "+(chair+6)+" , № "+(chair+7)+" свободно. Будете брать?";
                            answer=confirm(msg);
                            if(answer==true)
                            {
                                document.getElementById("r"+(row+1)+"_"+(chair+1)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+1)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+2)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+2)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+3)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+3)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+4)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+4)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+5)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+5)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+6)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+6)).title="Место продано";
                                document.getElementById("r"+(row+1)+"_"+(chair+7)).src="images/chair1.png";
                                document.getElementById("r"+(row+1)+"_"+(chair+7)).title="Место продано";
                                cinema[chair]=cinema_etalon[chair]=false;
                                cinema[chair+1]=cinema_etalon[chair+1]=false;
                                cinema[chair+2]=cinema_etalon[chair+2]=false;
                                cinema[chair+3]=cinema_etalon[chair+3]=false;
                                cinema[chair+4]=cinema_etalon[chair+4]=false;
                                cinema[chair+5]=cinema_etalon[chair+5]=false;
                                cinema[chair+6]=cinema_etalon[chair+6]=false;
                                break;
                            }
                        */
                    }
                    if (answer == true) {
                        break;
                    }
                }
        }
        if(answer==false)
        {
            alert("Нет мест по вашему критерию поиска");
        }
    }
    else
    {
        alert("Некорректное значение");
    }
}
//////////////////////
function optimize(num, row,col)
{
    let count=0;//считает свободные кресла
    let answer=false;//согласие пользователя на покупку предложенных кресел
    let status=false;//позволяет понять что текущее кресло свободно или занято
    for(let i=col; i<(num+col); i++)//перебираем кресла в текущем ряду
    {
        if(cinema[row][i]==true)//берем текущее кресло, если оно свободно счетчик увеличиваем на 1 а статус кресло подходящее
        {
            count++;
            status=true;//статус кресло подходящее
        }
        else//иначе если среди кресел найдется одно неподходящее
        {
            count=0;//счетчик сбрасываем в 0 и статус false
            status=false;
        }
    }
    if(status==true && count==num)//проверяем, если есть набор подходящих кресел по запросу пользователя
    {
        let msg="Кресло в ряду"+(row+1)+" с"+(col+1)+" по "+(num+col)+" свободны. Будете брать?";
        answer=confirm(msg);
        if(answer==true)
        {
            for(let z=col; z<(num+col);z++)
            {
                document.getElementById("r"+(row+1)+"_"+(z+1)).src="images/chair1.png";
                document.getElementById("r"+(row+1)+"_"+(z+1)).title="Место продано";
                cinema[row][z]=false;
                cinema_etalon[row][z]=false;
            }
        }
    }
    return answer;//когда отработает функция, возвращаем переменную answer, если в ней значение true то пользователь согласился купить кресла, если false то отказался
}