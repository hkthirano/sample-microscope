import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/WebGLTile';
import DataTile from 'ol/source/DataTile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map!: Map;

  ngOnInit(): void {
    const size = 256;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d')!;
    context.strokeStyle = 'white';
    context.textAlign = 'center';
    context.font = '24px sans-serif';
    const lineHeight = 30;

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new DataTile({
            loader: (z: number, x: number, y: number) => {
              const half = size / 2;
              context.clearRect(0, 0, size, size);
              context.fillStyle = 'rgba(100, 100, 100, 0.5)';
              context.fillRect(0, 0, size, size);
              context.fillStyle = 'black';
              context.fillText(`z: ${z}`, half, half - lineHeight);
              context.fillText(`x: ${x}`, half, half);
              context.fillText(`y: ${y}`, half, half + lineHeight);
              context.strokeRect(0, 0, size, size);
              const data = context.getImageData(0, 0, size, size).data;
              // converting to Uint8Array for increased browser compatibility
              return new Uint8Array(data.buffer);
            },
            // disable opacity transition to avoid overlapping labels during tile loading
            transition: 0,
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
  }
}
