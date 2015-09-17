var oldDoc, newDoc;
var targetLayer;
var oAppRulerUnits = "";
var oAppTypeUnits = "";

function jsxCssSprite(){
    oldDoc = app.activeDocument;

    oAppRulerUnits = app.preferences.rulerUnits;
    oAppTypeUnits = app.preferences.typeUnits;

    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;

    targetLayer = app.activeDocument.activeLayer;
    _handleLayer(targetLayer);

    app.preferences.rulerUnits = oAppRulerUnits;
    app.preferences.typeUnits = oAppTypeUnits;
}




function _handleLayer($targetLayer){    
    var tmpTargetLayer = $targetLayer;    
    
    var containUp = false;
    var containOver = false;
    var containHit = false;
    
    var targetWidth = 0, targetHeight;
    var moveDurX, moveDurY;
        
    if(tmpTargetLayer.layers){
    
    }else{
        alert("圖層結構錯誤 -1");
        return;
    }
    
    for(var i=0; i<tmpTargetLayer.layers.length; i++){        
        var tmpLayerName = (tmpTargetLayer.layers[i].name).toLowerCase();
        if(tmpLayerName == "up"){
            containUp = true;
            
        }else  if(tmpLayerName == "over"){
            containOver = true;
            
        }else if(tmpLayerName == "hit"){
            containHit = true;
                       
            /*
            alert(
                     "bounds[0]: "+tmpTargetLayer.layers[i].bounds[0]+
                     "bounds[1]: "+tmpTargetLayer.layers[i].bounds[1]+
                     "bounds[2]: "+tmpTargetLayer.layers[i].bounds[2]+
                     "bounds[3]: "+tmpTargetLayer.layers[i].bounds[3]
                    );
            */
            
            var selRegion = Array(
                                                new Array(tmpTargetLayer.layers[i].bounds[0], tmpTargetLayer.layers[i].bounds[1]),
                                                new Array(tmpTargetLayer.layers[i].bounds[2], tmpTargetLayer.layers[i].bounds[1]),
                                                new Array(tmpTargetLayer.layers[i].bounds[2], tmpTargetLayer.layers[i].bounds[3]),
                                                new Array(tmpTargetLayer.layers[i].bounds[0], tmpTargetLayer.layers[i].bounds[3]),
                                                new Array(tmpTargetLayer.layers[i].bounds[0], tmpTargetLayer.layers[i].bounds[1])
            );
            
            targetWidth  = tmpTargetLayer.layers[i].bounds[2] - tmpTargetLayer.layers[i].bounds[0];
            targetHeight = tmpTargetLayer.layers[i].bounds[3] - tmpTargetLayer.layers[i].bounds[1];
             
            moveDurX = tmpTargetLayer.layers[i].bounds[0] * -1;
            moveDurY = tmpTargetLayer.layers[i].bounds[1] * -1;
        }
        
    }
    // alert("containUp:\t"+containUp+"\ncontainOver:\t"+containOver+"\ncontainHit:\t"+containHit);
    
    oldDoc.activeLayer = tmpTargetLayer;
    
    if(containUp && containOver && containHit){            
            newDoc = app.documents.add(targetWidth, targetHeight * 2, 72);
            
            app.activeDocument = oldDoc;
            
            var newLayer = (tmpTargetLayer.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING));
            
            app.activeDocument = newDoc;

            moveCurrentLayer(moveDurX, moveDurY);
            _setOverClipPos();
            
            
            
    }else if( !containUp){
        alert("圖層結構錯誤 : 需指定 Up 圖層 / 群組");
    }else if( !containOver){
        alert("圖層結構錯誤 : 需指定 Over 圖層 / 群組");
    }else if( !containHit){
        alert("圖層結構錯誤 : 需指定 Hit 圖層 / 群組");
    }
}



function _setOverClipPos(){
        tmpTargetLayer = app.activeDocument.activeLayer;
    
        var upLayer, overLayer, hitLayer;
        
        for(var i=0; i<tmpTargetLayer.layers.length; i++){
            
            var tmpLayerName = (tmpTargetLayer.layers[i].name).toLowerCase();
            if(tmpLayerName == "up"){
                upLayer = tmpTargetLayer.layers[i];
            }else  if(tmpLayerName == "over"){
                overLayer = tmpTargetLayer.layers[i];
               
            }else if(tmpLayerName == "hit"){
                 hitLayer = tmpTargetLayer.layers[i];
            }
        
            
        
        }
    
        upLayer.visible = true;
        overLayer.visible = true;
        hitLayer.visible = false;    
    
        app.activeDocument.activeLayer = overLayer;
        moveCurrentLayer(0, app.activeDocument.height * .5);
        
        app.activeDocument.layers[app.activeDocument.layers.length-1].remove();
        
        app.activeDocument.activeLayer = tmpTargetLayer;
        
}


function moveCurrentLayer($moveDurX, $moveDurY) {
    app.activeDocument.activeLayer.translate ($moveDurX, $moveDurY);
}

jsxCssSprite();