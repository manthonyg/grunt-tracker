import React from 'react';

function SquadOverviewCard(props) {
const d = new Date()
    return (

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div class="tile">
                        <div class="wrapper">
                        <div class="dates">
                            <div class="start">
                                <strong>{props.unit} {props.company} CO. {props.platoon}/{props.squad}</strong>
                                <span></span>
                            </div>
                            <div class="ends"><strong>ACCOUNTABILITY</strong>
                                11/12
                            </div>
                        </div>

                        <div class="stats">

                            <div>
                                <strong>TOTAL MARINES</strong> {props.totalMarines}
                            </div>

                            <div>
                                <strong>APPOINTMENTS</strong> {props.appointments}
                            </div>

                            <div>
                                <strong>DECLINED</strong> 182
                            </div>

                        </div>

                        <div class="stats">

                            <div>
                                <strong>PFT AVG</strong> 267
                            </div>

                            <div>
                                <strong>CFT AVG</strong> 232
                            </div>

                            <div>
                                <strong>TOTAL AVG</strong> 248
                            </div>

                        </div>

                        <div class="stats">

                            <div>
                                <strong>IAR</strong> 7
                            </div>

                            <div>
                                <strong>M38</strong> 1
                            </div>

                            <div>
                                <strong>203</strong> 2
                            </div>

                        </div>

                        <div class="footer">
                           
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        </div>
 


    )
}


export default SquadOverviewCard
