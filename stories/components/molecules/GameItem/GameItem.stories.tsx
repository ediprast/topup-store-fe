import { Meta } from "@storybook/react";
import GameItem, {
  GameItemProps,
} from "../../../../components/molecules/GameItem";

export default {
  title: "Components/Molecules/GameItem",
  component: GameItem,
} as Meta;

const Template = (args: GameItemProps) => <GameItem {...args} />;

export const Default = Template.bind({});
Default.arguments = {
  title: "Nama Game",
  category: "Desktop",
  thumbnail: "/img/Thumbnail-1.png",
};
