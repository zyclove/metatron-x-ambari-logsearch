/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '@app/services/auth.service';

import { Store } from '@ngrx/store';
import { AppStore } from '@app/classes/models/store';
import { isAuthorizedSelector } from '@app/store/selectors/auth.selectors';

/**
 * The goal of this guard service is to prevent to display the login screen when the user is logged in.
 */
@Injectable()
export class LoginScreenGuardService implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppStore>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isAuthorizedSelector).map((isAuthorized: boolean) => {
      if (isAuthorized && state.url === '/login') {
        this.router.navigate(['/']);
      }
      return !isAuthorized;
    });
  }

}
