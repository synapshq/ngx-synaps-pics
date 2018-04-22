export enum Gravity {
  center = 'center',
  northwest = 'northwest',
  north = 'north',
  northeast = 'northeast',
  east = 'east',
  southeast = 'southeast',
  south = 'south',
  southwest = 'southwest',
  west = 'west'
}

export class SynapsImageOptions {
  public path: string;
  public retina?: boolean;
  public width?: number;
  public height?: number;
  public crop?: string;
  public bg?: string;
  public quality?: number;
  public gravity?: Gravity;
}
