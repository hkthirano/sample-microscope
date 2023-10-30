import OpenSeadragon from 'openseadragon';
import { useEffect, useRef } from 'react';

function App() {
  const viewerRef = useRef<null | OpenSeadragon.Viewer>(null);

  useEffect(() => {
    const duomo = {
      Image: {
        xmlns: "http://schemas.microsoft.com/deepzoom/2008",
        Url: "//openseadragon.github.io/example-images/duomo/duomo_files/",
        Format: "jpg",
        Overlap: "2",
        TileSize: "256",
        Size: {
          Width: "13920",
          Height: "10200"
        }
      }
    };

    const viewer = OpenSeadragon({
      id: "seadragon-viewer",
      prefixUrl: "//openseadragon.github.io/openseadragon/images/",
      tileSources: duomo
    });
    viewerRef.current = viewer;
    return () => {
      viewerRef.current?.destroy()
    }
  }, [])

  return (
    <div id="seadragon-viewer" style={{ width: '800px', height: '600px' }} ></div >
  );
}

export default App;
