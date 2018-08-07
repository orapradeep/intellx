import { Component, OnInit } from '@angular/core';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { AbstractCameraService } from '../services/abstract-camera.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {


  imageString: string = '';
  // faceApiResponse: Observable<FaceRecognitionResponse>;
  faceApiResponse = null;
  subscriptionKey: string;
  isFaceDetectionDivOpen = false;
  isRequestProcessing = false;
  errorMessage = "";


  objDetectionURL1 = "https://www.youtube.com/embed/scEO0yKtmDQ";
  objDetectionURL2 = "https://www.youtube.com/embed/56qHb-tLvuc"

  faceRecognitionURL1 = "https://www.youtube.com/embed/TNDluRC6M5Q"


  constructor(
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService
  ) { }


  ngOnInit() {

    var random = Math.round((Math.random() % 100) * 10);
    this.subscriptionKey = (random % 2 == 0) ? environment.subscriptionKey1 : environment.subscriptionKey2;

  }

  ngAfterViewInit() {
  }


  ngOnDestroy() {

    this.stopMediaStreaming();
  }


  stopMediaStreaming() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {

        // var track = stream.getTracks()[0];
        // track.stop();

        // stream.getVideoTracks()[0].stop(); // Recommended

        stream.getTracks().forEach(track => track.stop());


      }).catch(e => {
        console.log("Exception while stopping the streaming media");
      });
    }
  }



  expandFaceDetectionSection() {
    this.isFaceDetectionDivOpen = !this.isFaceDetectionDivOpen;

    if (this.isFaceDetectionDivOpen) {

      document.getElementById('video2').style.display = 'block';
      document.getElementById('myCanvasDiv').style.display = 'block';

      this.initializeVideoCapture();

    } else {

      this.stopMediaStreaming();

      document.getElementById('video2').style.display = 'none';
      document.getElementById('myCanvasDiv').style.display = 'none';

    }

  }


  initializeVideoCapture() {

    var self = this;

    var video = <HTMLVideoElement>document.getElementById('video2');

    // console.log("Video 111 : " + video);

    if (video) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
          //video.src = window.URL.createObjectURL(stream);
          //video.play();

          video.srcObject = stream;
        }).catch(e => {
          self.errorMessage = "No Camera found";
          document.getElementById('video2').style.display = 'none';
          document.getElementById('myCanvasDiv').style.display = 'none';
        });


        // Capture images from Video
        const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
        const context = canvas.getContext('2d');

        context.canvas.width = video.clientWidth * 0.8;
        context.canvas.height = video.clientHeight * 1.0;


        const captureButton = <HTMLButtonElement>document.getElementById('capture');

        captureButton.addEventListener('click', () => {
          // Draw the video frame to the canvas.
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          var base64Image = canvas.toDataURL("image/jpeg");
          this.processImage(base64Image);
        });

      } else {
        self.errorMessage = "No Camera found";
        document.getElementById('video2').style.display = 'none';
        document.getElementById('myCanvasDiv').style.display = 'none';
      }

    } else {
      console.log("Video is empty.");
    }

  }


  processImage(base64Image) {

    var self = this;

    self.imageString = base64Image;

    self.isRequestProcessing = true;

    self.faceRecognitionService.scanImage(
      self.subscriptionKey,
      self.imageString //base64Image
    ).subscribe(result => {

      console.log("faceApiResponse response : " + JSON.stringify(result));
      //console.log("typeof : " + typeof (result));

      self.isRequestProcessing = false;

      if (result && (typeof (result) == "object")) {


        self.faceApiResponse = result;

        //======== Draw Rect on the image Start ===========

        var left = result[0].faceRectangle.left;
        var top = result[0].faceRectangle.top - 10;
        var width = result[0].faceRectangle.width;
        var height = result[0].faceRectangle.height + 10;

        var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(left, top, width, height);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'green';
        ctx.stroke();


        //======== Draw Rect on the image End ===========

      }

    });

  }


  // processImage() {

  //   var self = this;
  //   this.cameraService.getPhoto().subscribe(base64Image => {
  //     self.imageString = base64Image;

  //     self.faceRecognitionService.scanImage(
  //       self.subscriptionKey,
  //       self.imageString //base64Image
  //     ).subscribe(result => {

  //       //console.log("result : " + JSON.stringify(result));
  //       //console.log("typeof : " + typeof (result));

  //       // this.isRequestProcessing = false;

  //       if (result && (typeof (result) == "object")) {


  //         self.faceApiResponse = result;

  //         //======== Draw Rect on the image Start ===========

  //         var left = result[0].faceRectangle.left - 30;
  //         var top = result[0].faceRectangle.top - 30;
  //         var width = result[0].faceRectangle.width;
  //         var height = result[0].faceRectangle.height;


  //         var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  //         var ctx = canvas.getContext("2d");



  //         // var canvasParentDiv = <HTMLDivElement>document.getElementById("myCanvasDiv");
  //         // if (canvasParentDiv) {
  //         //   // console.log("div width : " + div.clientWidth);
  //         //   // console.log("div height : " + div.clientHeight);

  //         //   ctx.canvas.width = canvasParentDiv.clientWidth - 20;
  //         //   ctx.canvas.height = canvasParentDiv.clientHeight;

  //         //   // console.log("canvasDiv width 22 : " + canvasDiv.clientWidth);
  //         //   // console.log("canvasDiv height 22 : " + canvasDiv.clientHeight);
  //         // }




  //         var image = new Image();
  //         image.onload = function () {
  //           ctx.drawImage(image, 0, 0, image.width * 0.9, image.height * 0.9);

  //           ctx.beginPath();
  //           ctx.rect(left, top, width, height);
  //           ctx.lineWidth = 5;
  //           ctx.strokeStyle = 'green';
  //           ctx.stroke();

  //         };
  //         image.src = base64Image;

  //         //======== Draw Rect on the image End ===========

  //       }

  //     });
  //   });

  // }





}
