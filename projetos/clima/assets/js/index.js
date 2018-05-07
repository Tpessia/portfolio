$(function () {

    initializers();

    post_initialization();

    animations();

});

function initializers() {

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    datepickers = M.Datepicker.init($$('.datepicker'), {
        'autoClose': true,
        'format': 'mmm dd, yyyy',
        'minDate': new Date('1996-06-30T00:00:00'),
        'maxDate': yesterday,
        'yearRange': [1996, yesterday.getFullYear()],
        'defaultDate': yesterday,
        'onOpen': function() {
            this.setDate(new Date(this.options.defaultDate));
        },
        'onSelect': function(d) {
            datepickers[0].options.defaultDate = d;
        },
        'i18n': { // Internacionalização
            'cancel': 'Cancelar',
            'clear': 'Limpar',
            'months': [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ],
            'monthsShort': [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ],
            'weekdays': [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado'
            ],
            'weekdaysShort': [
                'Dom',
                'Seg',
                'Ter',
                'Qua',
                'Qui',
                'Sex',
                'Sab'
            ],
            'weekdaysAbbrev': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        }
    });
    
    $.ajax({
        url: "get-last.php",
        success: function (date) {
            if (date.match(/^(\d){4}[- \/.]?(0[1-9]|1[012])[- \/.]?(0[1-9]|[12][0-9]|3[01])$/)) { // Match date [0000-9999][0-12][0-31]
                datepickers[0].options.maxDate = new Date(date + "T00:00:00");
                datepickers[0].options.yearRange = [1996, new Date(date + "T00:00:00").getFullYear()];
                datepickers[0].options.defaultDate = new Date(date + "T00:00:00");
            }
            else {
                console.log("Valor inválido de get-last.php: " + date);
            }
        }
    });

    $("#date-form").on("submit", function () {
        $("#submit button").addClass("disabled")
        $("#submit .progress").removeClass("hide");

        var date = datepickers[0].options.defaultDate;

        var dateStr = date.getFullYear() + "" + dateFix(date.getMonth() + 1) + "" + dateFix(date.getDate());
        $.ajax({
            url: "query.php?date=" + dateStr,
            success: function (json) {
                try {
                    var data = JSON.parse(json);
                    // data = JSON.parse(`{"summary":{"ID":"2425","date":"2003-02-07","maxtempi":"91","maxtempm":"33","meantempi":"81","meantempm":"28","mintempi":"71","mintempm":"22","maxdewpti":"72","maxdewptm":"22","meandewpti":"69","meandewptm":"20","mindewpti":"61","mindewptm":"16","maxvisi":"6.2","maxvism":"10","meanvisi":"4.9","meanvism":"7.9","minvisi":"1.6","minvism":"2.5","maxpressurei":"30.09","maxpressurem":"1019","meanpressurei":"30.06","meanpressurem":"1017.92","minpressurei":"30.04","minpressurem":"1017","maxwspdi":"17","maxwspdm":"28","meanwindspdi":"6","meanwindspdm":"10","minwspdi":"0","minwspdm":"0","meanwdird":"12","meanwdire":"NNE","humidity":"73","maxhumidity":"89","minhumidity":"46","precipi":"0","precipm":"0","precipsource":"3Or6HourObs","fog":"0","hail":"0","rain":"1","snow":"0","thunder":"1","tornado":"0","snowdepthi":"","snowdepthm":"","snowfalli":"","snowfallm":"","coolingdegreedays":"16","coolingdegreedaysnormal":"0","heatingdegreedays":"0","heatingdegreedaysnormal":"0","gdegreedays":"31","monthtodatecoolingdegreedays":"","monthtodatecoolingdegreedaysnormal":"","monthtodateheatingdegreedays":"","monthtodateheatingdegreedaysnormal":"","monthtodatesnowfalli":"","monthtodatesnowfallm":"","since1jancoolingdegreedays":"","since1jancoolingdegreedaysnormal":"","since1julheatingdegreedays":"","since1julheatingdegreedaysnormal":"","since1julsnowfalli":"","since1julsnowfallm":"","since1sepcoolingdegreedays":"","since1sepcoolingdegreedaysnormal":"","since1sepheatingdegreedays":"","since1sepheatingdegreedaysnormal":""},"hourly":[{"ID":"29061","date":"2003-02-07","datetime":"2003-02-07:00","conds":"Clear","icon":"clear","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"-9999","vism":"-9999","hum":"74","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"80","wdire":"East","wspdi":"11.5","wspdm":"18.5","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070200Z 08010KT CAVOK 25/20 Q1019"},{"ID":"29062","date":"2003-02-07","datetime":"2003-02-07 01:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"-9999","vism":"-9999","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070300Z 07008KT CAVOK 24/20 Q1018"},{"ID":"29063","date":"2003-02-07","datetime":"2003-02-07 02:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"-9999","vism":"-9999","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"0","wdire":"North","wspdi":"0","wspdm":"0","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070400Z 00000KT CAVOK 24/20 Q1018"},{"ID":"29064","date":"2003-02-07","datetime":"2003-02-07 03:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"-9999","vism":"-9999","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"6.9","wspdm":"11.1","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070500Z 07006KT CAVOK 24/20 Q1017"},{"ID":"29065","date":"2003-02-07","datetime":"2003-02-07 04:00:00","conds":"Clear","icon":"clear","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"66.2","dewptm":"19","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"-9999","vism":"-9999","hum":"73","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"900","wdire":"North","wspdi":"5.8","wspdm":"9.3","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070600Z 90005KT CAVOK 24/19 Q1017"},{"ID":"29066","date":"2003-02-07","datetime":"2003-02-07 05:00:00","conds":"Clear","icon":"clear","tempi":"73.4","tempm":"23","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"-9999","vism":"-9999","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"80","wdire":"East","wspdi":"6.9","wspdm":"11.1","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070700Z 08006KT CAVOK 23/20 Q1017"},{"ID":"29067","date":"2003-02-07","datetime":"2003-02-07 06:00:00","conds":"Clear","icon":"clear","tempi":"73.4","tempm":"23","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"5","vism":"8","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"90","wdire":"East","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070800Z 09004KT 8000 SKC 23/20 Q1017"},{"ID":"29068","date":"2003-02-07","datetime":"2003-02-07 07:00:00","conds":"Clear","icon":"clear","tempi":"73.4","tempm":"23","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"-9999","vism":"-9999","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"40","wdire":"NE","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 070900Z 04004KT CAVOK 23/20 Q1018"},{"ID":"29069","date":"2003-02-07","datetime":"2003-02-07 08:00:00","conds":"Unknown","icon":"unknown","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"5","vism":"8","hum":"74","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071000Z 07004KT 8000 NSC 25/20 Q1018"},{"ID":"29070","date":"2003-02-07","datetime":"2003-02-07 09:00:00","conds":"Unknown","icon":"unknown","tempi":"80.6","tempm":"27","heatindexi":"83.9","heatindexm":"28.9","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"5","vism":"8","hum":"70","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"70","wdire":"ENE","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071100Z 07004KT 8000 NSC 27/21 Q1019"},{"ID":"29071","date":"2003-02-07","datetime":"2003-02-07 10:00:00","conds":"Clear","icon":"clear","tempi":"82.4","tempm":"28","heatindexi":"87.2","heatindexm":"30.7","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"-9999","vism":"-9999","hum":"70","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"360","wdire":"North","wspdi":"5.8","wspdm":"9.3","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071200Z 36005KT CAVOK 28/22 Q1019"},{"ID":"29072","date":"2003-02-07","datetime":"2003-02-07 11:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"86","tempm":"30","heatindexi":"89.4","heatindexm":"31.9","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"6.2","vism":"10","hum":"55","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"330","wdire":"NNW","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071300Z 33008KT 9999 FEW025 SCT300 30/20 Q1019"},{"ID":"29073","date":"2003-02-07","datetime":"2003-02-07 12:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"87.8","tempm":"31","heatindexi":"92.6","heatindexm":"33.7","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"6.2","vism":"10","hum":"55","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"330","wdire":"NNW","wspdi":"11.5","wspdm":"18.5","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071400Z 33010KT 9999 SCT025 31/21 Q1019"},{"ID":"29074","date":"2003-02-07","datetime":"2003-02-07 13:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"89.6","tempm":"32","heatindexi":"96.2","heatindexm":"35.6","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"6.2","vism":"10","hum":"55","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"360","wdire":"North","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071500Z 36008KT 9999 SCT025 SCT300 32/22 Q1018"},{"ID":"29075","date":"2003-02-07","datetime":"2003-02-07 14:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"89.6","tempm":"32","heatindexi":"94.7","heatindexm":"34.9","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"6.2","vism":"10","hum":"52","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"350","wdire":"North","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071600Z 35008KT 9999 BKN030 SCT300 32/21 Q1018"},{"ID":"29076","date":"2003-02-07","datetime":"2003-02-07 15:00:00","conds":"Scattered Clouds","icon":"partlycloudy","tempi":"91.4","tempm":"33","heatindexi":"95.4","heatindexm":"35.2","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"6.2","vism":"10","hum":"46","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"360","wdire":"North","wspdi":"8.1","wspdm":"13","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071700Z 36007KT 9999 BKN030 SCT300 33/20 Q1017"},{"ID":"29077","date":"2003-02-07","datetime":"2003-02-07 16:00:00","conds":"Light Thunderstorms and Rain","icon":"tstorms","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"60.8","dewptm":"16","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"2.5","vism":"4","hum":"57","fog":"0","rain":"1","thunder":"1","hail":"0","snow":"0","tornado":"0","wdird":"160","wdire":"SSE","wspdi":"17.3","wspdm":"27.8","wgusti":"34.5","wgustm":"55.6","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071800Z 16015G30KT 4000 -TSRA SCT010 BKN030 FEW040CB BKN100 25/16 Q1017"},{"ID":"29078","date":"2003-02-07","datetime":"2003-02-07 17:00:00","conds":"Thunderstorms and Rain","icon":"tstorms","tempi":"71.6","tempm":"22","heatindexi":"-9999","heatindexm":"-9999","dewpti":"68","dewptm":"20","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"1.6","vism":"2.5","hum":"88","fog":"0","rain":"1","thunder":"1","hail":"0","snow":"0","tornado":"0","wdird":"340","wdire":"NNW","wspdi":"9.2","wspdm":"14.8","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 071900Z 34008KT 2500 TSRA BKN007 BKN030 FEW040CB BKN100 22/20 Q1018"},{"ID":"29079","date":"2003-02-07","datetime":"2003-02-07 18:00:00","conds":"Mostly Cloudy","icon":"mostlycloudy","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"6.2","vism":"10","hum":"89","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"200","wdire":"SSW","wspdi":"5.8","wspdm":"9.3","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072000Z 20005KT 9999 FEW030 BKN100 24/22 Q1017 RETS"},{"ID":"29080","date":"2003-02-07","datetime":"2003-02-07 19:00:00","conds":"Mostly Cloudy","icon":"mostlycloudy","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.04","pressurem":"1017","visi":"5","vism":"8","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"330","wdire":"NNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072100Z 33004KT 8000 FEW040 BKN100 24/21 Q1017"},{"ID":"29081","date":"2003-02-07","datetime":"2003-02-07 20:00:00","conds":"Unknown","icon":"unknown","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"4.3","vism":"7","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"300","wdire":"WNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072200Z 30004KT 7000 NSC 24/21 Q1018"},{"ID":"29082","date":"2003-02-07","datetime":"2003-02-07 21:00:00","conds":"Unknown","icon":"unknown","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"4.3","vism":"7","hum":"83","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"300","wdire":"WNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 072300Z 30004KT 7000 NSC 24/21 Q1018"},{"ID":"29083","date":"2003-02-07","datetime":"2003-02-07 22:00:00","conds":"Unknown","icon":"unknown","tempi":"75.2","tempm":"24","heatindexi":"-9999","heatindexm":"-9999","dewpti":"71.6","dewptm":"22","precipi":"-9999","precipm":"-9999","pressurei":"30.06","pressurem":"1018","visi":"4.3","vism":"7","hum":"89","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"310","wdire":"NW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 080000Z 31004KT 7000 NSC 24/22 Q1018"},{"ID":"29084","date":"2003-02-07","datetime":"2003-02-07 23:00:00","conds":"Unknown","icon":"unknown","tempi":"77","tempm":"25","heatindexi":"-9999","heatindexm":"-9999","dewpti":"69.8","dewptm":"21","precipi":"-9999","precipm":"-9999","pressurei":"30.09","pressurem":"1019","visi":"4.3","vism":"7","hum":"78","fog":"0","rain":"0","thunder":"0","hail":"0","snow":"0","tornado":"0","wdird":"300","wdire":"WNW","wspdi":"4.6","wspdm":"7.4","wgusti":"-9999","wgustm":"-9999","windchilli":"-999","windchillm":"-999","metar":"METAR SBSP 080100Z 30004KT 7000 NSC 25/21 Q1019"}],"almanac":{}}`);
                }
                catch (e) {
                    $("#submit button").removeClass("disabled")
                    $("#submit .progress").addClass("hide");
                    alert("Erro de conexão com o servidor (valor inesperado)");
                    throw "JSON inválido!";
                }
                
                var hoursHTML = "",
                    summaryHTML = "",
                    almanacHTML = "";

                if (!isNull(data.summary, 2)) {
                    var summary = checkNotAvailable(data.summary);
                    
                    summaryHTML += '<tr><td>'
                    + summary.maxtempm + '</td><td>' 
                    + summary.meantempm + '</td><td>' 
                    + summary.mintempm + '</td><td>' 
                    + summary.maxpressurem + '</td><td>' 
                    + summary.meanpressurem + '</td><td>' 
                    + summary.minpressurem + '</td><td>' 
                    + summary.humidity + '</td><td>' 
                    + summary.precipm + '</td><td>' 
                    + summary.meanvism + '</td><td>' 
                    + translate(summary.meanwdire) + '</td><td>' 
                    + summary.meanwdird + '</td><td>' 
                    + summary.meanwindspdm + '</td><td>' 
                    + bitToStr(summary.fog) + '</td><td>' 
                    + bitToStr(summary.rain) + '</td><td>' 
                    + bitToStr(summary.hail) + '</td><td>' 
                    + bitToStr(summary.thunder) + '</td></tr>';

                    function bitToStr(bit) {
                        return bit == 0 ? "Não" : "Sim";
                    }
                }
                else {
                    summaryHTML = '<tr><td colspan="9">Resumo do Dia Indisponível</td></tr>';
                }

                if (!isNull(data.hourly[0], 3)) {
                    for (var i in data.hourly) {
                        var hour = checkNotAvailable(data.hourly[i]),
                            datetime = new Date(hour.datetime.replace(" ","T"));

                        hoursHTML += '<tr><td>' 
                        + dateFix(datetime.getHours()) + ":" + dateFix(datetime.getMinutes()) + ":" + dateFix(datetime.getSeconds()) + '</td><td>' 
                        + translate(hour.conds) + '</td><td>' 
                        + hour.tempm + '</td><td>' 
                        + hour.pressurem + '</td><td>' 
                        + hour.hum + '</td><td>' 
                        + hour.precipm + '</td><td>' 
                        + hour.vism + '</td><td>' 
                        + translate(hour.wdire) + '</td><td>' 
                        + hour.wdird + '</td><td>' 
                        + hour.wspdm + '</td><td>' 
                        + hour.wgustm + '</td></tr>';
                    }
                }
                else {
                    hoursHTML = '<tr><td colspan="9">Dados Indisponíveis</td></tr>';
                }

                if (!isNull(data.almanac, 2)) {
                    var almanac = checkNotAvailable(data.almanac);

                    almanacHTML += '<tr><td>' 
                    + almanac.temp_high_normal_m + '</td><td>' 
                    + almanac.temp_high_record_m + '</td><td>' 
                    + almanac.temp_high_record_year + '</td><td>' 
                    + almanac.temp_low_normal_m + '</td><td>' 
                    + almanac.temp_low_record_m + '</td><td>' 
                    + almanac.temp_low_record_year + '</td></tr>';
                }
                else {
                    almanacHTML = '<tr><td colspan="9">Recordes Indisponíveis</td></tr>';
                }

                $("#date-title h3").html("Clima em " + dateFix(date.getDate()) + "/" + dateFix(date.getMonth() + 1) + "/" + date.getFullYear());
                $("#summary tbody").html(summaryHTML);
                $("#hourly tbody").html(hoursHTML);
                $("#almanac tbody").html(almanacHTML);
                $("main .row").removeClass("hide");
                $("main h5").addClass("hide");

                function isNull(data, notNullQnt) { // é nulo ou tem menos (<=) que x ("notNullQnt") propriedades
                    if (data === null || typeof data === "undefined" || (data.hasOwnProperty("length") ? data.length == 0 : false) || (typeof date === "object" ? Object.keys(data).length == 0 : false)) {
                        return true;
                    }

                    var notNull = 0;

                    for (var i in data) {
                        if (data[i] != "") {
                            notNull++;
                        }
                    }

                    if (notNull <= notNullQnt) {
                        return true;
                    }

                    return false;
                }

                function checkNotAvailable(data) {
                    for (var p in data) {
                        if (data[p] == "-999" || data[p] == "-9999") {
                            data[p] = "n/a";
                        }
                    }
                    return data;
                }

                function translate(text) {
                    var dic = {

                        "North": "Norte",
                        "South": "Sul",
                        "East": "Leste",
                        "West": "Oeste",
                        "Variable": "Variável",
                        "Unknown Precipitation": "Precipitação Desconhecida",
                        "Thunderstorms and Rain": "Tempestades e Chuva",
                        "Thunderstorms and Snow": "Tempestades e Neve",
                        "Thunderstorms and Ice Pellets": "Tempestades e Pelotas de Neve",
                        "Thunderstorms with Hail": "Tempestades com Granizo",
                        "Thunderstorms with Small Hail": "Tempestades com Pequenos Granizos",
                        "Low Drifting Snow": "Neve à Deriva",
                        "Low Drifting Widespread Dust": "Poeira à Deriva",
                        "Low Drifting Sand": "Areia à Deriva",
                        "Snow Blowing Snow Mist": "Sopros de Neve/Névoa",
                        "Ice Pellet Showers": "Pancadas de Pelotas de Gelo",
                        "Small Hail Showers": "Pancadas de Pequenos Granizos",
                        "Blowing Widespread Dust": "Sopro de Poeira",
                        "Partly Cloudy": "Parcialmente Nublado",
                        "Mostly Cloudy": "Predominantemente Nublado",
                        "Scattered Clouds": "Nuvens Dispersas",
                        "Small Hail": "Chuva de Granizo Fraca",
                        "Freezing Drizzle": "Garoa Congelante",
                        "Freezing Rain": "Chuva Congelante",
                        "Freezing Fog": "Névoa Congelante",
                        "Patches of Fog": "Patches of Fog",
                        "Shallow Fog": "Névoa Rasa",
                        "Partial Fog": "Névoa Parcial",
                        "Funnel Cloud": "Nuvem de Funil",
                        "Blowing Snow": "Sopro de Neve",
                        "Blowing Sand": "Sopro de Areia",
                        "Rain Mist": "Névoa de Chuva",
                        "Rain Showers": "Pancadas de Chuva",
                        "Snow Showers": "Pancadas de Neve",
                        "Hail Showers": "Pancadas de Granizo",
                        "Dust Whirls": "Redemoinho de Poeira",
                        "Volcanic Ash": "Cinzas Vulcânicas",
                        "Widespread Dust": "Poeira Difusa",
                        "Snow Grains": "Grãos de Neve",
                        "Ice Crystals": "Cristais de Gelo",
                        "Ice Pellets": "Pelotas de Gelo",
                        "Drizzle": "Garoa",
                        "Rain": "Chuva",
                        "Snow": "Nevasca",
                        "Hail": "Chuva de Granizo",
                        "Mist": "Névoa",
                        "Fog": "Névoa Densa",
                        "Fog Patches": "Fog Patches",
                        "Smoke": "Fumaça",
                        "Sand": "Areia",
                        "Haze": "Neblina",
                        "Spray": "Spray",
                        "Sandstorm": "Tempestade de Areia",
                        "Thunderstorm": "Tempestada",
                        "Overcast": "Nublado",
                        "Clear": "Céu Limpo",
                        "Squalls": "Rajadas de Vento",
                        "Unknown": "Desconhecido"

                    };

                    for (var key in dic) {
                        text = text.replace(key,dic[key]);
                    }

                    if (text.match("Heavy")) {
                        text = text.replace("Heavy", "").concat(" Pesada").trim();
                    }
                    else if (text.match("Light")) {
                        text = text.replace("Light", "").concat(" Leve").trim();
                    }

                    return text;
                }
            },
            error: function() {
                alert("Erro de conexão. Tente novamente!");
            },
            complete: function() {
                $("#submit button").removeClass("disabled")
                $("#submit .progress").addClass("hide");
            }
        });
    });

}

function post_initialization() {

    $("#date-selector .datepicker").removeAttr("disabled");

    $("#submit button").removeClass("disabled");

}

function animations() {

}