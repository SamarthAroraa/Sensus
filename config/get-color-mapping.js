const colormap = require("colormap");

//Function returns rgba value for color

module.exports.getColorMapping = ({ score, magnitude }) => {
  //spring color group
  const spring_colors = colormap({
    colormap: "spring",
    nshades: 28,
    format: "rgb",
    alpha: 1,
  });

  //velocity blue color
  const velocity_blue_colors = colormap({
    colormap: "velocity-blue",
    nshades: 28,
    format: "rgb",
    alpha: 1,
  });

  //Only the second right side 5/14th is taken. The pink hues are discarded from the predefined spring color group

  //happy color list
  const happy_colors = spring_colors.slice(18);
  //sad color list
  const sad_colors = velocity_blue_colors.slice(0, 10).reverse();
  //initialized the color group to be used
  let color_group = null;

  //-ve score corresponds to unhappy moods
  //+ve score corresponds to happy moods
  if (score >= 0) {
    score_color_index = Math.floor(score * 10);
    color_group = happy_colors;
  } else {
    score_color_index = Math.floor(Math.abs(score) * 10);
    color_group = sad_colors;
  }

  //opacity for the color, mapped to the confidence value. Tanh is used to clamp the [0,inf) range
  // for confidence to a [0,1) range for the opacity
  const alpha_val = Math.tanh(Math.abs(1.5 * magnitude)).toFixed(2);

  const color_group_array = color_group[score_color_index];

  const rgba = `rgba(${color_group_array[0]},${color_group_array[1]},${color_group_array[2]},${alpha_val})`;
  return rgba;
};
