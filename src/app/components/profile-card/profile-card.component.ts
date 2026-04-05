import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Rive, StateMachineInput } from '@rive-app/canvas';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit, AfterViewInit {
  @ViewChild('riveCanvas') riveCanvas!: ElementRef<HTMLCanvasElement>;

  profile: any = null;
  isEditing = false;
  saveSuccess = false;
  editForm: any = {};

  private riveInstance: any = null;
  private hoverInput: StateMachineInput | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      this.editForm = {
        fullName: data.fullName,
        role: data.role,
        location: data.location,
        bio: data.bio,
        email: data.email,
        settings: {
          notifications: { ...data.settings.notifications },
          privacy: { ...data.settings.privacy }
        }
      };
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initRive(), 500);
  }

initRive(): void {
  if (!this.riveCanvas?.nativeElement) return;

  const canvas = this.riveCanvas.nativeElement;
  canvas.width = 120;
  canvas.height = 120;

  this.riveInstance = new Rive({
    src: 'animations/avatar.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      const inputs = this.riveInstance.stateMachineInputs('State Machine 1');
      console.log('Rive inputs:', inputs);
      console.log('Input name:', inputs?.[0]?.name);
      this.hoverInput = inputs?.find((i: any) => i.name === 'clicked') ?? null;
      this.riveInstance.resizeDrawingSurfaceToCanvas();
    }
  });
}
onAvatarClick(): void {
  if (this.hoverInput) {
    this.hoverInput.fire();
  }
}
onSaveHover(isHovering: boolean): void {
  if (isHovering && this.hoverInput) {
    this.hoverInput.fire(); // Fire event כשעוברים על כפתור Save
  }
}
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

saveChanges(): void {
  this.profile = {
    ...this.profile,
    fullName: this.editForm.fullName,
    role: this.editForm.role,
    location: this.editForm.location,
    bio: this.editForm.bio,
    email: this.editForm.email,
    settings: {
      ...this.profile.settings,
      notifications: { ...this.editForm.settings.notifications },
      privacy: { ...this.editForm.settings.privacy }
    }
  };
  this.profileService.saveProfile(this.profile);
  this.isEditing = false;
  this.saveSuccess = true;
  setTimeout(() => this.saveSuccess = false, 3000);
}
  resetProfile(): void {
    this.profileService.resetProfile().subscribe(data => {
      this.profile = data;
      this.isEditing = false;
    });
  }
}