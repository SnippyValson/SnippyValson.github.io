import {
    getGradientStopsRgb
  } from "./../../libs/uitils.js";

export function getColors(color1, color2, numStops) {
    let colors = getGradientStopsRgb(
      color1,
      color2,
      numStops
    );
    if (colors.length < 16) {
      let length = colors.length;
      for (let i = 0; i < 16 - length; i++) {
        colors.push({
          r: 0,
          g: 0,
          b: 0,
        });
      }
    }
    let colorsRgb = {
      color0r: colors[0].r / 255,
      color0g: colors[0].g / 255,
      color0b: colors[0].b / 255,
      color1r: colors[1].r / 255,
      color1g: colors[1].g / 255,
      color1b: colors[1].b / 255,
      color2r: colors[2].r / 255,
      color2g: colors[2].g / 255,
      color2b: colors[2].b / 255,
      color3r: colors[3].r / 255,
      color3g: colors[3].g / 255,
      color3b: colors[3].b / 255,
      color4r: colors[4].r / 255,
      color4g: colors[4].g / 255,
      color4b: colors[4].b / 255,
      color5r: colors[5].r / 255,
      color5g: colors[5].g / 255,
      color5b: colors[5].b / 255,
      color6r: colors[6].r / 255,
      color6g: colors[6].g / 255,
      color6b: colors[6].b / 255,
      color7r: colors[7].r / 255,
      color7g: colors[7].g / 255,
      color7b: colors[7].b / 255,
      color8r: colors[8].r / 255,
      color8g: colors[8].g / 255,
      color8b: colors[8].b / 255,
      color9r: colors[9].r / 255,
      color9g: colors[9].g / 255,
      color9b: colors[9].b / 255,
      color10r: colors[10].r / 255,
      color10g: colors[10].g / 255,
      color10b: colors[10].b / 255,
      color11r: colors[11].r / 255,
      color11g: colors[11].g / 255,
      color11b: colors[11].b / 255,
      color12r: colors[12].r / 255,
      color12g: colors[12].g / 255,
      color12b: colors[12].b / 255,
      color13r: colors[13].r / 255,
      color13g: colors[13].g / 255,
      color13b: colors[13].b / 255,
      color14r: colors[14].r / 255,
      color14g: colors[14].g / 255,
      color14b: colors[14].b / 255,
      color15r: colors[15].r / 255,
      color15g: colors[15].g / 255,
      color15b: colors[15].b / 255,
    };
    return colorsRgb;
  }