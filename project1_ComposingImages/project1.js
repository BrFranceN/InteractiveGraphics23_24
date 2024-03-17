// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
    // console.log('ciao')

    var fg_y_start = fgPos.y;  //row where starts
    var fg_x_start = fgPos.x;  //column where starts
    var fg_y_end = fgPos.x; // row where ends
    var fg_x_end = fgPos.x; // column where ends

    var rows = bgImg.height;
    var columns = bgImg.width;
    var fg_rows = fgImg.height;
    var fg_columns = fgImg.width;

    //Iterate on background image
    for (var i = 0; i<rows; i++){
        for(var j=0; j<columns; j++){
            // Actual position of foreground on the background
            // For example if foreground image is in (100,50) fg_y, fg_x will be (0,0) when we stay at position (i,j) = (100,50)
            fg_y = i - fgPos.y; 
            fg_x = j - fgPos.x; 
            
            // *4 BECAUSE OF RGBA
            bg_index = (i * columns + j) * 4;
            fg_index = (fg_y * fg_columns + fg_x ) * 4;

            //check if pixel intersect or not
            // var intersect = check_intersect();

            // COMPUTE COLOR
            
            // get and normalize the 2 alpha channel.
            var bg_alpha = bgImg.data[bg_index+3]/255; 
            var fg_alpha = fgImg.data[fg_index+3]/255 *fgOpac; // with opacity
            
            // using formula on the slides
            var alpha = fg_alpha + (1-fg_alpha) * bg_alpha;

            if (alpha==0){
                console.log('alpha error');
                return;
            }

            // using formula on the slides
            bgImg.data[bg_index] = (fg_alpha*fgImg.data[fg_index] + (1-fg_alpha)*bgImg.data[bg_index]*bg_alpha) / alpha;   //R
            bgImg.data[bg_index+1] = (fg_alpha*fgImg.data[fg_index] + (1-fg_alpha)*bgImg.data[bg_index]*bg_alpha) / alpha; //G
            bgImg.data[bg_index+2] = (fg_alpha*fgImg.data[fg_index] + (1-fg_alpha)*bgImg.data[bg_index]*bg_alpha) / alpha; //B
            bgImg.data[bg_index+3] = alpha*255;                                                                            //A



        }
    }
}



// check_intersect(bgImg,fgImg,)