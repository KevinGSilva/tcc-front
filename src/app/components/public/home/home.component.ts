import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
              private el: ElementRef, 
              private renderer: Renderer2, 
              private router: Router,
              private loadingBar: LoadingBarService
            ) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const mainNav = this.el.nativeElement.querySelector('#mainNav');

    if (window.scrollY > 0) {
      this.renderer.addClass(mainNav, 'navbar-shrink');
    } else {
      this.renderer.removeClass(mainNav, 'navbar-shrink');
    }
  }

  ngOnInit(){
    this.loadingBar.complete()
  }

  scrollToSection(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
