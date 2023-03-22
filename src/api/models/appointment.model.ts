import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class AppointmentModel {
  @Prop()
  eventUUID: string;

  @Prop()
  eventCanelced: boolean;

  @Prop()
  eventCanceledAt: string;

  @Prop()
  eventCancelerName: string;

  @Prop()
  eventCancelReason: string;

  @Prop()
  eventCreatedAt: string;

  @Prop()
  eventEndTime: string;

  @Prop()
  eventEndTimePretty: string;

  @Prop()
  eventInviteeEndTime: string;

  @Prop()
  eventInviteeEndTimePretty: string;

  @Prop()
  eventInviteeStartTime: string;

  @Prop()
  eventInviteeStartTimePretty: string;

  @Prop()
  eventLocation: string;

  @Prop()
  eventStartTime: string;

  @Prop()
  eventStartTimePretty: string;

  @Prop()
  comments: string;

  @Prop()
  inviteeName: string;

  @Prop()
  inviteeEmail: string;

  @Prop()
  inviteeUUID: string;

  @Prop()
  inviteeTimezone: string;

  @Prop()
  inviteeReschedule: boolean;

  @Prop()
  zoomLink: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(AppointmentModel);
