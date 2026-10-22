export type SealColor = 'crimson' | 'gold' | 'emerald' | 'navy' | 'rose';
export type SealIcon = 'heart' | 'branch' | 'quill' | 'star' | 'rose';
export type StampStyle = 'vintage-paris' | 'botanical-rose' | 'airmail-gold';

export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  rotation: number;
}

export interface LetterData {
  recipientName: string;
  senderName: string;
  date: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  sealColor: SealColor;
  sealIcon: SealIcon;
  stampStyle: StampStyle;
  polaroids: PolaroidPhoto[];
}
