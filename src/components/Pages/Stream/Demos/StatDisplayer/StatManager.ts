// @ts-nocheck



// This class manages the contents of statDisplayer objects.
// StatManager stores the history of delays to calculate the averageDelay, 1% low delay, 1% high delay, and average frame time variation
// StatManager uses the information stored to update the content of the statDisplayer it was assigned to.
class StatManager {
    constructor(displayLeftSideRef: any, displayRightSideRef: any) {
        this.displayLeftSideRef = displayLeftSideRef;
        this.displayRightSideRef = displayRightSideRef;

        this.delays = [];

        this.delaySum = 0;
        this.delayAverage = 0;
        this.frameTimeVariationSum = 0;
        this.frameTimeVariationAverage = 0;

        this.onePercentSize = 0;
        this.onePercentLowSum = 0;
        this.onePercentHighSum = 0;
        this.drawLow = false;
        this.drawHigh = false;

        this.rerendered = false;

        this.goodColor =  {
            r: 0,
            g: 255,
            b: 0,
        }

        this.goodDelay = 300;
        this.delayRange = 200;
        this.onePercentRange = 100;
        this.goodVariation = 40;
        this.variationRange = 100;

        this.badColor = {
            r: 255,
            g: 0,
            b: 0,
        }

    }

    reset() {
        this.onePercentSize = 0;
        this.delays = [];

        this.delaySum = 0;
        this.delayAverage = 0;
        this.frameTimeVariationSum = 0;
        this.frameTimeVariationAverage = 0;

        this.onePercentLowSum = 0;
        this.onePercentHighSum = 0;
        this.drawLow = false;
        this.drawHigh = false;

        this.rerendered = true;
    }

    addDelay(delay: number) {
        if (this.delays.length == 0) {
            this.delays.push(delay);

            this.delaySum += delay;
            this.delayAverage = delay;

            this.frameTimeVariationSum = 0;
            this.frameTimeVariationAverage = 0;

            this.frameTimeVariationSum = 0;
            this.onePercentSize = 1;
            this.onePercentLowSum = delay;
            this.onePercentHighSum = delay;
            return;
        }

        this.delaySum += delay;
        let index = this.findIndexBinary(delay, 0, this.delays.length);

        if (index == this.delays.length) {
            this.delays.push(delay);
        } else {

            // Shifting elements in the array
            let prevIndexVal = delay;
            let temp;

            for (var i = index; i < this.delays.length; i++) {
                temp = this.delays[i];
                this.delays[i] = prevIndexVal;
                prevIndexVal = temp;
            }
            // I know i can just do this.delays[this.delays.length] = prevIndexValue but I prefer to keep the syntax java-like so I can keep my sanitiy lol
            this.delays.push(prevIndexVal);
        }

        // Calculating delay average and frameTimeVariationAverage
        this.delayAverage = this.delaySum / this.delays.length;
        this.frameTimeVariationSum += Math.abs(delay - this.delayAverage);
        this.frameTimeVariationAverage = this.frameTimeVariationSum / this.delays.length;



        if (this.onePercentSize < Math.ceil(this.delays.length / 100)) {
            // Cause we adding one delay at a time so if theres a difference => onePercentSize went up by 1
            this.onePercentSize += 1;



            if (index < this.onePercentSize) {

                // If theres an insertion inside the NEW onePercentLowRange
                this.onePercentLowSum += delay;
                this.onePercentHighSum += this.delays[this.delays.length - this.onePercentSize]

            } else if (index > (this.delays.length - 1) - this.onePercentSize) {

                // If theres an insertion inside the onePercentHighRange
                // this.delays.length - 1 is to account for the newly inserted delay
                // then recalculate the highest sum
                this.onePercentLowSum += this.delays[this.onePercentSize - 1];
                this.onePercentHighSum += delay;

            } else {

                // If the insertion didnt affect the previous lowPercentage and HighPercentage
                this.onePercentLowSum += this.delays[this.onePercentSize - 1];
                this.onePercentHighSum += this.delays[this.delays.length - this.onePercentSize];
            }
        } else {

            if (index < this.onePercentSize) {
                // If theres an insertion inside the onePercentLowRange
                // then recalculate the lowest sum
                this.onePercentLowSum = this.onePercentLowSum + delay - this.delays[this.onePercentSize];

            } else if (index > (this.delays.length - 1) - this.onePercentSize) {
                // If theres an insertion inside the onePercentHighRange
                // this.delays.length - 1 is to account for the newly inserted delay
                // then recalculate the highest sum
                this.onePercentHighSum = this.onePercentHighSum + delay - this.delays[this.delays.length - 1 - this.onePercentSize];
            }
        }



    }


    drawOnDisplayer() {
        if((this.onePercentLowSum / this.onePercentSize) > this.delayAverage){
            console.log("--------------------------------------------------------")
            console.log(this.delays)
            console.log(this.onePercentSize)
            console.log(this.onePercentLowSum)
        }

        


        // Calculating the stats
        let avg_delay: any = (this.delayAverage).toFixed(2);
        let avg_var: any = (this.frameTimeVariationAverage).toFixed(2);
        let one_low: any = (this.onePercentLowSum / this.onePercentSize).toFixed(2);
        let one_high: any = (this.onePercentHighSum / this.onePercentSize).toFixed(2);

        // Calculating the average delay color values
        let avg_delay_color_scale = Math.max(0, Math.min(1, (avg_delay - this.goodDelay) / this.delayRange));
        let avg_delay_color;
        if(avg_delay_color_scale <= 0.5) {
            avg_delay_color = {
                r:  this.goodColor.r + (this.badColor.r - this.goodColor.r) * (avg_delay_color_scale / 0.5),
                g:  this.goodColor.g,
                b:  this.goodColor.b + (this.badColor.b - this.goodColor.b) * (avg_delay_color_scale / 0.5),
            }
        }else {
            avg_delay_color = {
                r:  this.badColor.r,
                g:  this.badColor.g - (this.badColor.g - this.goodColor.g) * ( (1 - avg_delay_color_scale) / 0.5),
                b:  this.badColor.b - (this.badColor.b - this.goodColor.b) * ( (1 - avg_delay_color_scale) / 0.5),
            }
        }

        // Calculating the average variation color values
        let avg_var_color_scale = Math.max(0, Math.min(1, (avg_var - this.goodVariation) / this.variationRange));
        let avg_var_color;
        if(avg_delay_color_scale <= 0.5) {
            avg_var_color = {
                r:  this.goodColor.r + (this.badColor.r - this.goodColor.r) * (avg_var_color_scale / 0.5),
                g:  this.goodColor.g,
                b:  this.goodColor.b + (this.badColor.b - this.goodColor.b) * (avg_var_color_scale / 0.5),
            }
        }else {
            avg_var_color = {
                r:  this.badColor.r,
                g:  this.badColor.g - (this.badColor.g - this.goodColor.g) * ( (1 - avg_var_color_scale) / 0.5),
                b:  this.badColor.b - (this.badColor.b - this.goodColor.b) * ( (1 - avg_var_color_scale) / 0.5),
            }
        }

        // Calculating the one percent low color values
        let one_low_color_scale = Math.max(0, Math.min(1, (avg_delay - one_low ) / this.onePercentRange));
        let one_low_color;
        if(one_low_color_scale <= 0.5) {
            one_low_color = {
                r:  this.goodColor.r + (this.badColor.r - this.goodColor.r) * (one_low_color_scale / 0.5),
                g:  this.goodColor.g,
                b:  this.goodColor.b + (this.badColor.b - this.goodColor.b) * (one_low_color_scale / 0.5),
            }
        }else {
            one_low_color = {
                r:  this.badColor.r,
                g:  this.badColor.g - (this.badColor.g - this.goodColor.g) * ( (1 - one_low_color_scale) / 0.5),
                b:  this.badColor.b - (this.badColor.b - this.goodColor.b) * ( (1 - one_low_color_scale) / 0.5),
            }
        }

        // Calculating the one percent high color values
        let one_high_color_scale = Math.max(0, Math.min(1, (one_high - avg_delay) / this.onePercentRange));
        let one_high_color;
        if(one_high_color_scale <= 0.5) {
            one_high_color = {
                r:  this.goodColor.r + (this.badColor.r - this.goodColor.r) * (one_high_color_scale / 0.5),
                g:  this.goodColor.g,
                b:  this.goodColor.b + (this.badColor.b - this.goodColor.b) * (one_high_color_scale / 0.5),
            }
        }else {
            one_high_color = {
                r:  this.badColor.r,
                g:  this.badColor.g - (this.badColor.g - this.goodColor.g) * ( (1 - one_high_color_scale) / 0.5),
                b:  this.badColor.b - (this.badColor.b - this.goodColor.b) * ( (1 - one_high_color_scale) / 0.5),
            }
        }


        if (this.displayLeftSideRef.current != null) {
            

            this.displayLeftSideRef.current.averageRef.innerText = avg_delay + "ms";
            this.displayLeftSideRef.current.averageRef.style.color = 'rgb(' + avg_delay_color.r + "," + avg_delay_color.g + "," + avg_delay_color.b + ", 1)" ;

            this.displayLeftSideRef.current.frameTimeVariationRef.innerText = avg_var + "ms";
            this.displayLeftSideRef.current.frameTimeVariationRef.style.color = 'rgb(' + avg_var_color.r + "," + avg_var_color.g + "," + avg_var_color.b + ", 1)" ;

            this.displayLeftSideRef.current.onePercentLowRef.innerText = one_low + "ms";
            this.displayLeftSideRef.current.onePercentLowRef.style.color = 'rgb(' + one_low_color.r + "," + one_low_color.g + "," + one_low_color.b + ", 1)" ;

            this.displayLeftSideRef.current.onePercentHighRef.innerText = one_high + "ms";
            this.displayLeftSideRef.current.onePercentHighRef.style.color = 'rgb(' + one_high_color.r + "," + one_high_color.g + "," + one_high_color.b + ", 1)" ;
        }

        if (this.displayRightSideRef.current != null) {

            
            this.displayRightSideRef.current.averageRef.innerText = avg_delay + "ms";
            this.displayRightSideRef.current.averageRef.style.color = 'rgb(' + avg_delay_color.r + "," +avg_delay_color.g + "," +avg_delay_color.b + ", 1)" ;

            this.displayRightSideRef.current.frameTimeVariationRef.innerText = avg_var + "ms";
            this.displayRightSideRef.current.frameTimeVariationRef.style.color = 'rgb(' + avg_var_color.r + "," +avg_var_color.g + "," +avg_var_color.b + ", 1)" ;

            this.displayRightSideRef.current.onePercentLowRef.innerText = one_low + "ms";
            this.displayRightSideRef.current.onePercentLowRef.style.color = 'rgb(' + one_low_color.r + "," + one_low_color.g + "," + one_low_color.b + ", 1)" ;

            this.displayRightSideRef.current.onePercentHighRef.innerText = one_high + "ms";
            this.displayRightSideRef.current.onePercentHighRef.style.color = 'rgb(' + one_high_color.r + "," + one_high_color.g + "," + one_high_color.b + ", 1)" ;
        }

    }









    // A recursive function that find the position of the new delay inside the sorted array
    // start is inclusive, end is exclusive
    // The index returned by this function is the exact index the value should be in
    findIndexBinary(value: number, start: number, end: number) {

        if (start >= end) {
            console.log("findIndexBinary function in StatManager obj:\nInvalid start and end inputs. THIS SHOULD NEVER HAPPEN!")
            return -1;
        }

        let middle = Math.floor((start + end) / 2)
        if (this.delays[middle] == value) {
            return middle;
        }

        if (value < this.delays[middle]) {
            // If cannot go further back
            if (middle == start) {
                return middle;
            }

            //Go further back
            end = middle;
            return this.findIndexBinary(value, start, end);
        }


        // If cannot go further forward (end is exclusive)
        if (middle == (end - 1)) {
            return middle + 1;
        }

        // Go further forward
        start = middle + 1;
        return this.findIndexBinary(value, start, end);

    }

}

export default StatManager;
