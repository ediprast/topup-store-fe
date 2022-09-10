import { Meta } from "@storybook/react";
import StepItem, {
  StepItemProps,
} from "../../../../components/molecules/StepItem";

export default {
  title: "Components/Molecules/StepItem",
  component: StepItem,
} as Meta;

const Template = (args: StepItemProps) => <StepItem {...args} />;

export const Default = Template.bind({});
Default.arguments = {
  icon: "step1",
  title: "Desktop",
  desc1: "dsf",
  desc2: "dsfds",
};
