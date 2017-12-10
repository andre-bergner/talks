import QtQuick 2.2
import QtGraphicalEffects  1.0
import "Qrezi"

Qrezi {

   id: qrezi

   config {
      text_color: '#000'
      heading_font.family: 'Adequate'
      paragraph_font {
         family: 'Helvetica Neue'
         size: 30
         weight: Font.ExtraLight
      }
   }

   slides:  [  page1.slides
            ,  page2.slides
            ,  page3.slides
            ,  page4.slides
            ,  page5.slides
            ,  page6.slides
            ,  page7.slides
            ]

   current_frame: title

   Row {
      id: row

      Image {
         id: page1
         property variant slides: [
            title, oscillator, ode, dot_notation, ode, state_space, how_emerge_osc
         ]

         source: "Osci-Talk001.tif"

         Frame {
            id: title
            transform: OriginScale { scale: 4 }
            x: 200
            y: 400
         }

         Frame {
            id: oscillator
            transform: OriginScale { scale: 2 }
            x: 900
            y: 2500
         }

         Frame {
            id: ode
            transform: OriginScale { scale: 3 }
            x: 900
            y: 3300
         }

         Slide {
            id: dot_notation
            transform: OriginScale { scale: 1.3 }
            x: 0
            y: 3600
            Heading { text: "dot notation"}
         }

         Rectangle {
            id: state_space
            x: 3500
            y: 3000
            width: 1300
            height: 1800
            color: '#00000000'
         }

         Frame {
            id: how_emerge_osc
            transform: OriginScale { scale: 3 }
            x: 900
            y: 4800
         }

      }

      Image {
         id: page2
         property variant slides: [
            nonlin_dyn, lin_func, nonlin_func, linear_fp, nonlinear_bif,
            nonlinear_bif1, nonlinear_bif2, nonlinear_bif3, nonlinear_bif
         ]

         source: "Osci-Talk002.tif"

         Frame {
            id: nonlin_dyn
            transform: OriginScale { scale: 2.5 }
            x: 700
            y: 200
         }

         Frame {
            id: lin_func
            transform: OriginScale { scale: 2.3 }
            x: 2900
            y: 520
         }

         Frame {
            id: nonlin_func
            transform: OriginScale { scale: 2.2 }
            x: 2900
            y: 1520
         }

         Frame {
            id: linear_fp
            transform: OriginScale { scale: 3.4 }
            x: 200
            y: 1200
         }

         Frame {
            id: nonlinear_bif
            transform: OriginScale { scale: 6.5 }
            x: 200
            y: 3000

            Frame {
               transform: OriginScale { scale: 0.4 }
               Heading { text: "Saddle-Node Bifurcation" }
               x: 100
               y: 380
            }

            Frame {
               id: nonlinear_bif1
               transform: OriginScale { scale: 0.3 }
               x: 120
               y: 80
            }
            Frame {
               id: nonlinear_bif2
               transform: OriginScale { scale: 0.3 }
               x: 300
               y: 80
            }
            Frame {
               id: nonlinear_bif3
               transform: OriginScale { scale: 0.3 }
               x: 480
               y: 80
            }

         }
      }


      Image {
         id: page3

         property variant slides: [
            self_osc, stuart_landau_eq, polar_trafo,
            polar_form, phase_sol_plot, amplitude_anal, pitchfor_bif
         ]

         source: "Osci-Talk003.tif"

         Frame {
            id: self_osc
            transform: OriginScale { scale: 1.8 }
            x: 750
            y: 100
         }

         Frame {
            id: stuart_landau_eq
            transform: OriginScale { scale: 4 }
            x: 700
            y: 100
         }

         Frame {
            id: polar_trafo
            transform: OriginScale { scale: 5.3 }
            x: 200
            y: 200
         }

         Frame {
            id: polar_form
            transform: OriginScale { scale: 2.5 }
            x: 1000
            y: 2500
         }

         Frame {
            id: phase_sol_plot
            transform: OriginScale { scale: 3 }
            x: 1500
            y: 2300
         }

         Frame {
            id: amplitude_anal
            transform: OriginScale { scale: 4.5 }
            x: 400
            y: 2600
         }

         Frame {
            id: pitchfor_bif
            transform: OriginScale { scale: 4.8 }
            x: 200
            y: 3700
         }
      }

      Image {
         id: page4
         property variant slides: [hopf_bif, hopf_bif2, moog_filter]
         source: "Osci-Talk004.tif"

         Frame {
            id: hopf_bif
            transform: OriginScale { scale: 4.5 }
            x: -100
            y: -500
         }

         Frame {
            id: hopf_bif2
            transform: OriginScale { scale: 5.5 }
            x: 100
            y: 200
         }

         Frame {
            id: moog_filter
            transform: OriginScale { scale: 3.8 }
            x: 200
            y: 2800
         }
      }

      Image {
         id: page5
         property variant slides: [
            sync_title, two_sl_osc, two_sl_osc_circuit, two_sl_polar_trafo,
            two_sl_polar_form, remove_amp, phase_osc, change_ref_frame,
            phase_diff_eq, phase_diff_eq_bif, arnolds_tongue, moog_demo
         ]
         source: "Osci-Talk005.tif"

         Frame {
            id: sync_title
            transform: OriginScale { scale: 2 }
            x: 1000
            y: 0
         }

         Frame {
            id: two_sl_osc
            transform: OriginScale { scale: 3.5 }
            x: 750
            y: 350
         }

         Frame {
            id: two_sl_osc_circuit
            transform: OriginScale { scale: 5 }
            x: 750
            y: -150
         }

         Frame {
            id: two_sl_polar_trafo
            transform: OriginScale { scale: 5 }
            x: 750
            y: 350
         }

         Frame {
            id: two_sl_polar_form
            transform: OriginScale { scale: 3 }
            x: 1000
            y: 1800
         }

         Frame {
            id: remove_amp
            transform: OriginScale { scale: 3.2 }
            x: 1000
            y: 2100
         }

         Frame {
            id: phase_osc
            transform: OriginScale { scale: 3.2 }
            x: 1000
            y: 2800
         }

         Frame {
            id: change_ref_frame
            transform: OriginScale { scale: 3.2 }
            x: 1000
            y: 3200
         }

         Frame {
            id: phase_diff_eq
            transform: OriginScale { scale: 3 }
            x: 1000
            y: 3950
         }

         Frame {
            id: phase_diff_eq_bif
            transform: OriginScale { scale: 3 }
            x: 600
            y: 5300
         }

         Frame {
            id: arnolds_tongue
            transform: OriginScale { scale: 2.5 }
            x: 3200
            y: 5000
         }

         Frame {
            id: moog_demo
            transform: OriginScale { scale: 2.5 }
            x: 3200
            y: 6000
         }
      }

      Image {
         id: page6

         property variant slides: [
            nonlin_reso, duffing, fold_over, fold_over_demo
         ]

         source: "Osci-Talk006.tif"

         Frame {
            id: nonlin_reso
            transform: OriginScale { scale: 2.2 }
            x: -100
            y: -550
         }

         Frame {
            id: duffing
            transform: OriginScale { scale: 4 }
            x: -100
            y: -250
         }

         Frame {
            id: fold_over
            transform: OriginScale { scale: 3 }
            x: -150
            y: 1650
         }

         Frame {
            id: fold_over_demo
            transform: OriginScale { scale: 4.5 }
            x: -150
            y: 1350
         }

      }

      Image {
         id: page7

         property variant slides: [
            hub_demo, literature, conclusions
         ]

         source: "Osci-Talk007.tif"

         Image {
            property variant slides: []
            source: "sync_book.gif"
            x: 1000
            y: 3600
            scale: 2
         }

         Image {
            property variant slides: []
            source: "strogatz.jpg"
            x: 2000
            y: 3600
            scale: 1.8
         }

         Frame {
            id: hub_demo
            transform: OriginScale { scale: 3.7 }
            x: 650
            y: 650
         }

         Frame {
            id: literature
            transform: OriginScale { scale: 3 }
            x: 470
            y: 3000
         }

         Frame {
            id: conclusions
            transform: OriginScale { scale: 3.5 }
            x: 750
            y: 4500
         }
      }


   }

   /*
   foreground: Item {
      id: curtain
      anchors.fill: parent
      Timer {
         interval: 500; running: true; repeat: true
         onTriggered: {
            //var p = curtain.mapFromItem( state_space, 0, 0)
            var p = curtain.mapFromItem( qrezi.current_frame, 0, 0)
            console.log(p)
            left_curtain.width = p.x
         }
      }
      Rectangle {
         id: left_curtain
         color: '#445'
         x: 0
         y: 0
         Behavior on width { NumberAnimation { duration: 1000 }}
         //width: curtain.mapFromItem( qrezi.current_frame, 0, 0).x
         //onWidthChanged: console.log(width)
         height: 300
      }
   }
   */
   foreground: Item {
      id: curtain
      anchors.fill: parent
      property int curtain_width: (qrezi.current_frame==state_space)? 200 : 0
      Rectangle {
         color: '#fff'
         anchors.left: parent.left
         anchors.top: parent.top
         anchors.bottom: parent.bottom
         Behavior on width { NumberAnimation { duration: 300; easing.type: Easing.InOutQuad }}
         width: curtain.curtain_width
      }
      Rectangle {
         color: '#fff'
         anchors.right: parent.right
         anchors.top: parent.top
         anchors.bottom: parent.bottom
         Behavior on width { NumberAnimation { duration: 300; easing.type: Easing.InOutQuad }}
         width: curtain.curtain_width
      }

      Rectangle {
         anchors.right:  parent.right
         anchors.bottom: parent.bottom
         width: 100
         height: 35
         color: "#88000000"
         Text {
            anchors.right:  parent.right
            anchors.bottom: parent.bottom
            anchors.rightMargin:  8
            anchors.bottomMargin: 4
            font.family: "Adequate"
            font.pointSize: 20
            text: (qrezi.current_slide + 1) + " / " + qrezi.flat_slides.length
            color: "#fff"
         }
      }
   }

/*
   foreground: Rectangle {
      anchors.right:  parent.right
      anchors.bottom: parent.bottom
      width: 100
      height: 35
      color: "#88000000"
      Text {
         anchors.right:  parent.right
         anchors.bottom: parent.bottom
         anchors.rightMargin:  8
         anchors.bottomMargin: 4
         font.family: "Adequate"
         font.pointSize: 20
         text: (qrezi.current_slide + 1) + " / " + qrezi.flat_slides.length
         color: "#fff"
      }
   }
*/
}
