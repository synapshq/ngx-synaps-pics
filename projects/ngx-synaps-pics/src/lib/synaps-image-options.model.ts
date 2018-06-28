export enum Gravity {
  center = 'center',
  northwest = 'northwest',
  north = 'north',
  northeast = 'northeast',
  east = 'east',
  southeast = 'southeast',
  south = 'south',
  southwest = 'southwest',
  west = 'west',
  auto = 'auto'
}

export class SynapsImageOptions {
  public path: string;
  public dpi?: number;
  public width?: number;
  public height?: number;
  public crop?: string;
  public bg?: string;
  public quality?: number;
  public gravity?: Gravity;
  public format?: ['jpg', 'png', 'gif'];
}
